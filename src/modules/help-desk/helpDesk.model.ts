import { Schema, model } from "mongoose";
import { Keywords, PostType, PostStatus } from "./helpDesk.enum";
import { IComment, IPost } from "./helpDesk.interface";

// ১. Comment সাব-স্কিমা (Sub-schema for embedded comments)
const CommentSchema = new Schema<IComment>(
  {
    commenter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    commentedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [false, "Title is required"],
      trim: true,
    },
    postType: {
      type: String,
      enum: Object.values(PostType),
      required: [false, "Post type is required"],
    },
    description: {
      type: String,
      required: [false, "Description is required"],
    },
    attachments: {
      type: [String],
      default: [],
    },
    keywords: {
      type: [String],
      enum: Object.values(Keywords),
      validate: {
        validator: function (v: string[]) {
          if (this.is_duplicate) return true;

          return v && v.length >= 4 && v.length <= 9;
        },
        message: "You must provide between 4 and 9 keywords.",
      },
    },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.NEW,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "creatorModel",
      required: [false, "Creator ID is required"],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
    is_duplicate: {
      type: Boolean,
      default: false,
    },
    duplicateOf: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    description_embedding: {
      type: [Number],
      select: false,
    },
    ai_summary: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Post = model<IPost>("Post", PostSchema);
