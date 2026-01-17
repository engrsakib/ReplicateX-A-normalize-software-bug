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
}

export const postServices = new PostServices();
