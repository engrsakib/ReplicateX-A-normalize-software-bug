import { Document, Types } from "mongoose";
import { Keywords, PostType } from "./helpDesk.enum";

export interface IComment {
  commenter: Types.ObjectId;
  message: string;
  commentedAt: Date;
}

export interface IPost extends Document {
  title?: string;
  postType?: PostType;
  description?: string;
  attachments?: string[];
  keywords?: Keywords[];
  status?: string;
  createdBy: string;
  assignedTo?: string;
  comments?: IComment[];
  is_duplicate?: boolean;
  duplicateOf?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
