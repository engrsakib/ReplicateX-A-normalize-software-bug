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

  getAll = this.catchAsync(async (req: Request, res: Response) => {
    // সার্ভিস কল করা (req.query পাঠাচ্ছি পেজিনেশনের জন্য)
    const result = await postServices.getAllPosts(req.query);

    this.sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Help desk posts retrieved successfully",

      data: result,
    });
  });
}

export const HelpDeskController = new Controller();
