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
          return v && v.length >= 4 && v.length <= 9;
        },
        message: "You must provide between 4 and 9 keywords.",
      },
      required: [true, "At least 4 keywords are required"],
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.NEW,
      index: true,
    },
    createdBy: {
      type: String,
      required: [false, "Creator ID is required"],
    },
    assignedTo: {
      type: String,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Post = model<IPost>("Post", PostSchema);
