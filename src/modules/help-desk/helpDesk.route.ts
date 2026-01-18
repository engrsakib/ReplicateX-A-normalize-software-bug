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

router.patch(
  "/:id",
  validateRequest(helpDesk_validation.updatePostValidationSchema),
  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.update
);

router.get(
  "/:id",
  //   JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.getSingle
);

router.get(
  "/",
  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.getAll
);

export const help_desk = router;
