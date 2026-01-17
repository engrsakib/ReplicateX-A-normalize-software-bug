import { ROLES } from "@/constants/roles";
import { JwtInstance } from "@/lib/jwt";
import { Router } from "express";
import { HelpDeskController } from "./helpDesk.controller";
import validateRequest from "@/middlewares/validateRequest";
import { helpDesk_validation } from "./helpDesk.validation";

const router = Router();

router.post(
  "/",
  validateRequest(helpDesk_validation.createPostValidationSchema),
  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.create
);

export const help_desk = router;
