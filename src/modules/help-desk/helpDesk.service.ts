import { Post } from "./helpDesk.model";
import { IPost } from "./helpDesk.interface";
import { Types } from "mongoose";

class PostServices {
  async createPost(payload: IPost) {
    try {
      let existingPost: (IPost & { _id: Types.ObjectId }) | null = null;

      if (payload.title) {
        existingPost = await Post.findOne({ title: payload.title });
      }

      if (!existingPost && payload.keywords && payload.keywords.length > 0) {
        const totalInputKeywords = payload.keywords.length;

        const candidates = await Post.find({
          keywords: { $in: payload.keywords },
          is_duplicate: false,
        }).select("keywords _id");

        for (const candidate of candidates) {
          const dbKeywords = candidate.keywords ?? [];
          const inputKeywords = payload.keywords;

          // কমন কিওয়ার্ড বের করা
          const commonKeywords = dbKeywords.filter((k) =>
            inputKeywords.includes(k)
          );

          // এখানে কোনো কমন কিওয়ার্ড না থাকলে হিসাবের দরকার নেই
          if (commonKeywords.length === 0) continue;

          // --- লজিক আপডেট ---
          // ইনপুট এবং ডাটাবেস কিওয়ার্ডের মধ্যে যেটির সংখ্যা কম, সেটিকে বেস ধরব
          const minLength = Math.min(dbKeywords.length, totalInputKeywords);

          // পার্সেন্টেজ হিসাব
          const rawPercentage = (commonKeywords.length / minLength) * 100;
          const finalPercentage = Math.ceil(rawPercentage);

          // ৮০% বা তার বেশি হলে ডুপ্লিকেট
          if (finalPercentage >= 80) {
            existingPost = candidate as any;
            break;
          }
        }
      }

      // ৩. ডুপ্লিকেট হ্যান্ডলিং
      if (existingPost) {
        const duplicateEntry = await Post.create({
          createdBy: payload.createdBy,
          is_duplicate: true,
          duplicateOf: existingPost._id,

          title: null,
          description: null,
          keywords: [],
          postType: null,
          status: "Duplicate",
          attachments: [],
        });

        return {
          success: true,
          message: "Duplicate content detected. Merged with existing post.",
          data: duplicateEntry,
        };
      }

      // ৪. নতুন পোস্ট ক্রিয়েট
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
