import { Request, Response } from "express";
import httpStatus from "http-status"; // অথবা আপনার নিজস্ব HttpStatusCode enum ইমপোর্ট করুন
import BaseController from "@/shared/baseController";
import { postServices } from "./helpDesk.service";

class Controller extends BaseController {
  create = this.catchAsync(async (req: Request, res: Response) => {
    const result = await postServices.createPost(req.body);

    this.sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: result.success,
      message: result.message,
      data: result.data,
    });
  });

  // getAll = this.catchAsync(async (req: Request, res: Response) => {
  //   // সার্ভিস কল করা (req.query পাঠাচ্ছি পেজিনেশনের জন্য)
  //   const result = await postServices.getAllPosts(req.query);

  //   this.sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: "Help desk posts retrieved successfully",

  //     data: result,
  //   });
  // });

  getAll = this.catchAsync(async (req: Request, res: Response) => {
    // req.query এর মধ্যে searchTerm, postType, page, limit সব আছে
    const result = await postServices.getAllPosts(req.query);

    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Help desk posts retrieved successfully",
      data: result,
    });
  });

  update = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    // সার্ভিস কল করা
    const result = await postServices.updatePost(id, updateData);

    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: result.success,
      message: result.message,
      data: result.data,
    });
  });

  getSingle = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await postServices.getPostDetails(id);

    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Post details retrieved successfully",
      data: result,
    });
  });

  changeStatus = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body; // বডি থেকে স্ট্যাটাস নিবে

    const result = await postServices.changeStatus(id, status);

    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Status updated successfully",
      data: result,
    });
  });

  assignPost = this.catchAsync(async (req: Request, res: Response) => {
    const { adminId, postId } = req.body;
    if (!adminId || !postId) {
      throw new Error("Admin ID and Post ID are required in request body");
    }

    const result = await postServices.assignPost(postId, adminId);

    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Post assigned successfully",
      data: result,
    });
  });

  createComment = this.catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      throw new Error("Message is required in request body");
    }

    const result = await postServices.createComment(id, message);

    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment added successfully",
      data: result,
    });
  });

  editComment = this.catchAsync(async (req: Request, res: Response) => {
    const { id, commentId } = req.params;
    const { message } = req.body;

    if (!message) {
      throw new Error("Message is required in request body");
    }

    const result = await postServices.editComment(id, commentId, message);

    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment edited successfully",
      data: result,
    });
  });
}

export const HelpDeskController = new Controller();
