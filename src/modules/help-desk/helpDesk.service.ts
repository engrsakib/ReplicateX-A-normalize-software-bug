import { Post } from "./helpDesk.model";
import { IPost } from "./helpDesk.interface";
import { PipelineStage, Types } from "mongoose";
import { PostStatus } from "./helpDesk.enum";

class PostServices {
  async createPost(payload: IPost) {
    try {
      let existingPost: (IPost & { _id: Types.ObjectId }) | null = null;

      if (payload.title) {
        existingPost = await Post.findOne({ title: payload.title });
      }
      if (!existingPost && payload.keywords && payload.keywords.length > 0) {
        const inputKeywords = payload.keywords;
        const inputLength = inputKeywords.length;

        // Aggregation Pipeline
        const duplicates = await Post.aggregate([
          {
            // Stage 1: Match potential candidates (Index Scan)
            $match: {
              keywords: { $in: inputKeywords },
              is_duplicate: false,
            },
          },
          {
            // Stage 2: Calculate Intersection & Percentage
            $project: {
              _id: 1,

              intersectionSize: {
                $size: { $setIntersection: ["$keywords", inputKeywords] },
              },
              dbLen: { $size: "$keywords" },
            },
          },
          {
            // Stage 3: Apply the Formula
            // Percentage = (Intersection / Min(InputLen, DBLen)) * 100
            $project: {
              _id: 1,
              percentage: {
                $multiply: [
                  {
                    $divide: [
                      "$intersectionSize",
                      { $min: ["$dbLen", inputLength] },
                    ],
                  },
                  100,
                ],
              },
            },
          },
          {
            // Stage 4: Filter based on threshold (80%)

            $match: {
              $expr: { $gte: [{ $ceil: "$percentage" }, 80] },
            },
          },
          {
            // Stage 5: Limit
            $limit: 1,
          },
        ]);

        if (duplicates.length > 0) {
          existingPost = duplicates[0] as any;
        }
      }

      if (existingPost) {
        const duplicateEntry = await Post.create({
          createdBy: payload.createdBy,
          is_duplicate: true,
          duplicateOf: existingPost._id,

          title: null,
          description: null,
          keywords: [],
          postType: null,
          status: PostStatus.DUPLICATE,
          attachments: [],
        });

        return {
          success: true,
          message: "Duplicate content detected. Merged with existing post.",
          data: duplicateEntry,
        };
      }

      // ৪. সব ঠিক থাকলে নতুন পোস্ট
      const newPost = await Post.create(payload);

      return {
        success: true,
        message: "Help desk entry created successfully",
        data: newPost,
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to create help desk entry");
    }
  }

  async updatePost(id: string, payload: Partial<IPost>) {
    try {
      // ১. প্রথমে বর্তমান পোস্টটি খুঁজে বের করা
      const postToUpdate = await Post.findById(id);

      if (!postToUpdate) {
        throw new Error("Post not found");
      }

      // ২. যদি পোস্টটি আগে থেকেই ডুপ্লিকেট হয়, তবে আপডেট করতে দিব না
      if (
        postToUpdate.status === PostStatus.DUPLICATE ||
        postToUpdate.is_duplicate
      ) {
        throw new Error(
          "Cannot update a duplicate post. Please update the original post instead."
        );
      }

      // ৩. ডুপ্লিকেট চেকিং শুরু (যদি Title বা Keywords আপডেট করা হয়)
      let existingPost: (IPost & { _id: Types.ObjectId }) | null = null;

      // ৩.১ টাইটেল চেক (নিজের ID বাদ দিয়ে)
      if (payload.title) {
        existingPost = await Post.findOne({
          title: payload.title,
          _id: { $ne: id }, // নিজেকে বাদ দিয়ে খোঁজা
        });
      }

      // ৩.২ কিওয়ার্ড চেক (যদি টাইটেল না মিলে এবং নতুন কিওয়ার্ড আসে)
      // নোট: আমরা আপডেটেড কিওয়ার্ড অথবা আগের কিওয়ার্ড ব্যবহার করব চেকিংয়ের জন্য
      const keywordsToCheck = payload.keywords || postToUpdate.keywords;

      if (!existingPost && keywordsToCheck && keywordsToCheck.length > 0) {
        const inputLength = keywordsToCheck.length;

        const duplicates = await Post.aggregate([
          {
            $match: {
              keywords: { $in: keywordsToCheck },
              is_duplicate: false,
              _id: { $ne: new Types.ObjectId(id) }, // নিজেকে বাদ দিয়ে
            },
          },
          {
            $project: {
              _id: 1,
              intersectionSize: {
                $size: { $setIntersection: ["$keywords", keywordsToCheck] },
              },
              dbLen: { $size: "$keywords" },
            },
          },
          {
            $project: {
              _id: 1,
              percentage: {
                $multiply: [
                  {
                    $divide: [
                      "$intersectionSize",
                      { $min: ["$dbLen", inputLength] },
                    ],
                  },
                  100,
                ],
              },
            },
          },
          {
            $match: {
              $expr: { $gte: [{ $ceil: "$percentage" }, 80] },
            },
          },
          { $limit: 1 },
        ]);

        if (duplicates.length > 0) {
          existingPost = duplicates[0] as any;
        }
      }

      // ৪. যদি আপডেটের ফলে এটি ডুপ্লিকেট হয়ে যায়
      if (existingPost) {
        // বর্তমান পোস্টটিকে ডুপ্লিকেট হিসেবে মার্ক করে দেওয়া হবে
        const duplicateUpdate = await Post.findByIdAndUpdate(
          id,
          {
            is_duplicate: true,
            duplicateOf: existingPost._id,
            status: PostStatus.DUPLICATE,

            // কন্টেন্ট মুছে ফেলা হচ্ছে (আপনার রিকোয়ারমেন্ট অনুযায়ী)
            title: null,
            description: null,
            keywords: [],
            postType: null,
            attachments: [],

            // কে আপডেট করেছে বা কখন হয়েছে তা ট্র্যাক করতে পারেন
            updatedAt: new Date(),
          },
          { new: true } // আপডেটেড ডাটা রিটার্ন করবে
        );

        return {
          success: true,
          message:
            "Update caused a duplicate match. Post marked as duplicate of existing entry.",
          data: duplicateUpdate,
        };
      }

      // ৫. যদি ডুপ্লিকেট না হয়, নরমাল আপডেট
      const result = await Post.findByIdAndUpdate(id, payload, {
        new: true, // আপডেটেড ডকুমেন্ট রিটার্ন করবে
        runValidators: true, // স্কিমা ভ্যালিডেশন চেক করবে (min words etc.)
      });

      return {
        success: true,
        message: "Post updated successfully",
        data: result,
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to update post");
    }
  }

  async getAllPosts(query: Record<string, unknown>) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const pipeline: PipelineStage[] = [
      // ১. সর্টিং (নতুন পোস্ট আগে দেখাবে)
      { $sort: { createdAt: -1 } },

      // ২. পেজিনেশন এর জন্য Facet ব্যবহার (একই সাথে ডাটা এবং কাউন্ট পাওয়া যাবে)
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $skip: skip },
            { $limit: limit },

            // ৩. ডুপ্লিকেট হ্যান্ডলিং (Self Lookup)
            // যদি পোস্টটি ডুপ্লিকেট হয়, তবে অরিজিনাল পোস্টের তথ্য আনব
            {
              $lookup: {
                from: "posts", // কালেকশন নাম (মঙ্গোডিবিতে সাধারণত ছোট হাতের এবং প্লুরাল হয়)
                localField: "duplicateOf",
                foreignField: "_id",
                as: "originalPost",
              },
            },
            {
              $unwind: {
                path: "$originalPost",
                preserveNullAndEmptyArrays: true,
              },
            },

            // ৪. ফিল্ড মার্জ করা (Duplicate হলে অরিজিনাল ডাটা নিবে, না হলে নিজের ডাটা)
            {
              $addFields: {
                title: { $ifNull: ["$title", "$originalPost.title"] },
                description: {
                  $ifNull: ["$description", "$originalPost.description"],
                },
                postType: { $ifNull: ["$postType", "$originalPost.postType"] },
                keywords: {
                  $cond: {
                    if: { $gt: [{ $size: { $ifNull: ["$keywords", []] } }, 0] },
                    then: "$keywords",
                    else: "$originalPost.keywords",
                  },
                },
              },
            },

            // ৫. ক্রিয়েটর পপুলেট করা (User এবং Admin দুই কালেকশন থেকেই চেক করবে)
            {
              $lookup: {
                from: "users", // আপনার User কালেকশনের নাম
                localField: "createdBy",
                foreignField: "_id",
                as: "userDetails",
              },
            },
            {
              $lookup: {
                from: "admins", // আপনার Admin কালেকশনের নাম (যদি থাকে)
                localField: "createdBy",
                foreignField: "_id",
                as: "adminDetails",
              },
            },
            {
              $addFields: {
                // creatorModel চেক করে সঠিক ডাটা সেট করা
                creator: {
                  $cond: {
                    if: { $eq: ["$creatorModel", "Admin"] },
                    then: { $arrayElemAt: ["$adminDetails", 0] },
                    else: { $arrayElemAt: ["$userDetails", 0] },
                  },
                },
              },
            },

            // ৬. ফাইনাল প্রজেকশন (ডাটা ফরম্যাটিং)
            {
              $project: {
                _id: 1,
                title: 1,
                postType: 1,
                status: 1,
                createdAt: 1, // পোস্টের ডেট
                is_duplicate: 1,

                // ক্রিয়েটরের প্রয়োজনীয় তথ্য
                creator: {
                  name: {
                    $concat: [
                      "$creator.name.firstName",
                      " ",
                      "$creator.name.lastName",
                    ],
                  }, // নাম জোড়া লাগানো
                  profileImg: "$creator.profileImg", // ইমেজ (screenshot image_f408eb অনুযায়ী)
                  email: "$creator.email",
                },

                // কমেন্টস কাউন্ট
                commentsCount: { $size: { $ifNull: ["$comments", []] } },

                // ডেসক্রিপশন ২০ শব্দে কেটে নেওয়া (Logic: Split -> Slice -> Reduce)
                shortDescription: {
                  $let: {
                    vars: {
                      words: {
                        $split: [{ $ifNull: ["$description", ""] }, " "],
                      },
                    },
                    in: {
                      $concat: [
                        {
                          $reduce: {
                            input: { $slice: ["$$words", 0, 20] }, // ০ থেকে ২০ শব্দ
                            initialValue: "",
                            in: {
                              $cond: [
                                { $eq: ["$$value", ""] },
                                "$$this",
                                { $concat: ["$$value", " ", "$$this"] },
                              ],
                            },
                          },
                        },
                        // যদি ২০ শব্দের বেশি থাকে তবে "..." যোগ করবে
                        {
                          $cond: [
                            { $gt: [{ $size: "$$words" }, 20] },
                            "...",
                            "",
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
          ],
        },
      },
    ];

    const result = await Post.aggregate(pipeline);

    // মেটাডাটা প্রসেসিং
    const total = result[0].metadata[0]?.total || 0;
    const posts = result[0].data;

    return {
      meta: {
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      },
      data: posts,
    };
  }

  async getPostDetails(id: string) {
    const pipeline: PipelineStage[] = [
      // ১. ম্যাচিং
      { $match: { _id: new Types.ObjectId(id) } },

      // ২. ডুপ্লিকেট হ্যান্ডলিং (Self Lookup)
      {
        $lookup: {
          from: "posts",
          localField: "duplicateOf",
          foreignField: "_id",
          as: "originalPost",
        },
      },
      {
        $unwind: { path: "$originalPost", preserveNullAndEmptyArrays: true },
      },

      // ৩. ডাটা মার্জিং
      {
        $addFields: {
          title: { $ifNull: ["$title", "$originalPost.title"] },
          description: {
            $ifNull: ["$description", "$originalPost.description"],
          },
          postType: { $ifNull: ["$postType", "$originalPost.postType"] },
          keywords: {
            $cond: {
              if: { $gt: [{ $size: { $ifNull: ["$keywords", []] } }, 0] },
              then: "$keywords",
              else: "$originalPost.keywords",
            },
          },
          attachments: {
            $cond: {
              if: { $gt: [{ $size: { $ifNull: ["$attachments", []] } }, 0] },
              then: "$attachments",
              else: "$originalPost.attachments",
            },
          },
        },
      },

      // ৪. CreatedBy পপুলেট (User & Admin)
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "userCreator",
        },
      },
      {
        $lookup: {
          from: "admins",
          localField: "createdBy",
          foreignField: "_id",
          as: "adminCreator",
        },
      },

      // ৫. টেম্পোরারি 'creator' ফিল্ড তৈরি করা (যাতে প্রজেকশনে ব্যবহার করা যায়)
      {
        $addFields: {
          _tempCreator: {
            $cond: {
              if: { $gt: [{ $size: "$userCreator" }, 0] },
              then: { $arrayElemAt: ["$userCreator", 0] },
              else: { $arrayElemAt: ["$adminCreator", 0] },
            },
          },
        },
      },

      // ৬. AssignedTo এবং Comments পপুলেশন (আগের মতোই)
      {
        $lookup: {
          from: "admins",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedAdmin",
        },
      },
      {
        $unwind: { path: "$comments", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.commenter",
          foreignField: "_id",
          as: "comments.commenterDetails",
        },
      },
      {
        $addFields: {
          "comments.commenter": {
            $arrayElemAt: ["$comments.commenterDetails", 0],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          root: { $first: "$$ROOT" },
          comments: { $push: "$comments" },
        },
      },
      {
        $addFields: {
          "root.comments": {
            $cond: [{ $ifNull: ["$comments.message", false] }, "$comments", []],
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$root", { comments: "$comments" }] },
        },
      },

      // ৭. ফাইনাল প্রজেকশন (এখানে createdBy ফরম্যাট করা হয়েছে)
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          postType: 1,
          status: 1,
          keywords: 1,
          attachments: 1,
          createdAt: 1,
          updatedAt: 1,
          is_duplicate: 1,

          // createdBy কে সুন্দর অবজেক্ট আকারে সাজানো
          createdBy: {
            _id: "$_tempCreator._id",
            name: {
              $concat: [
                "$_tempCreator.name.firstName",
                " ",
                "$_tempCreator.name.lastName",
              ],
            }, // নাম জোড়া লাগানো
            email: "$_tempCreator.email",
            profileImg: "$_tempCreator.profileImg",
            role: "$creatorModel", // User নাকি Admin সেটাও দেখাবে
          },

          // assignedTo ফরম্যাট
          assignedTo: {
            $let: {
              vars: { admin: { $arrayElemAt: ["$assignedAdmin", 0] } },
              in: {
                _id: "$$admin._id",
                name: {
                  $concat: [
                    "$$admin.name.firstName",
                    " ",
                    "$$admin.name.lastName",
                  ],
                },
                email: "$$admin.email",
              },
            },
          },

          // কমেন্টস ফরম্যাট (লুপের ভেতর ক্লিন করা)
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                message: "$$comment.message",
                commentedAt: "$$comment.commentedAt",
                commenter: {
                  _id: "$$comment.commenter._id",
                  name: {
                    $concat: [
                      "$$comment.commenter.name.firstName",
                      " ",
                      "$$comment.commenter.name.lastName",
                    ],
                  },
                  profileImg: "$$comment.commenter.profileImg",
                },
              },
            },
          },
        },
      },
    ];

    const result = await Post.aggregate(pipeline);

    if (!result || result.length === 0) {
      throw new Error("Post not found");
    }

    return result[0];
  }
}

export const postServices = new PostServices();
