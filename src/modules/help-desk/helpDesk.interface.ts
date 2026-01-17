import { Document } from "mongoose";
import { Keywords, PostType } from "./helpDesk.enum";

interface IComment {
  commenter: string;
  message: string;
  commentedAt: Date;
}

export interface IPost extends Document {
  title: string;
  postType: PostType;
  description: string;
  attachments?: string[];
  keywords: Keywords[];
  status: string;
  createdBy: string;
  assignedTo?: string;
  comments?: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
