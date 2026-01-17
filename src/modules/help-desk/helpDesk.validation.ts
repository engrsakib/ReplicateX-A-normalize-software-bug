import { z } from "zod";
import { Keywords, PostType, PostStatus } from "./helpDesk.enum";

const countWords = (str: string) => {
  return str
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
};

const commentValidationSchema = z.object({
  commenter: z.string({ required_error: "Commenter ID is required" }),
  message: z.string({ required_error: "Message is required" }).trim().min(1),
  commentedAt: z.date().optional(),
});

const basePostSchemaShape = {
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .refine((val) => countWords(val) >= 5, {
      message: "Title must contain at least 5 words.",
    })
    .refine((val) => countWords(val) <= 50, {
      message: "Title cannot exceed 50 words.",
    }),

  postType: z.nativeEnum(PostType, {
    errorMap: () => ({ message: "Invalid post type provided." }),
  }),

  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .refine((val) => countWords(val) >= 20, {
      message: "Description must contain at least 20 words.",
    }),

  attachments: z.array(z.string().url("Invalid URL")).optional().default([]),

  keywords: z
    .array(z.nativeEnum(Keywords), {
      required_error: "Keywords are required",
      invalid_type_error: "Keywords must be an array of valid enums",
    })
    .min(4, { message: "You must provide at least 4 keywords." })
    .max(9, { message: "You cannot provide more than 9 keywords." }),

  status: z.nativeEnum(PostStatus).optional().default(PostStatus.NEW),

  createdBy: z.string({ required_error: "Creator ID is required" }).optional(),

  assignedTo: z.string().optional().nullable(),

  comments: z.array(commentValidationSchema).optional().default([]),

  is_duplicate: z.boolean().optional().default(false),

  duplicateOf: z.string().optional().nullable(),
};

export const createPostValidationSchema = z.object({
  body: z.object({
    ...basePostSchemaShape,
  }),
});

export const updatePostValidationSchema = z.object({
  body: z
    .object({
      ...basePostSchemaShape,
    })
    .partial(),
});
