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
}

export const HelpDeskController = new Controller();
