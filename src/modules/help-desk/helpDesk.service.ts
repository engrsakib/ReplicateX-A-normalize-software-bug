import { Post } from "./helpDesk.model";
import { IPost } from "./helpDesk.interface";
import { Types } from "mongoose";
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
}

export const postServices = new PostServices();
