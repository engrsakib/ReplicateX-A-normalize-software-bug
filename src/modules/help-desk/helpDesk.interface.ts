import { Document } from "mongoose";

interface IComment {
  commenter: string;
  message: string;
  commentedAt: Date;
}

export interface IPost extends Document {
  title: string;
  postType: string;
  batch: string;
  description: string;
  attachments?: string[];
  keywords?: string[];
  status: string;
  createdBy: string;
  assignedTo?: string;
  comments?: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
