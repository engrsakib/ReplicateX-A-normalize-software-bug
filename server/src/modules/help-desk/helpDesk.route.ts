import { ROLES } from "@/constants/roles";
import { JwtInstance } from "@/lib/jwt";
import { Router } from "express";
import { HelpDeskController } from "./helpDesk.controller";

const router = Router();

router.post(
  "/",

  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.create
);

router.patch(
  "/assign",
  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.assignPost
);

router.patch(
  "/:id",

  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.update
);

router.patch(
  "/:id/change-status",
  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.changeStatus
);

router.get(
  "/:id",
  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.getSingle
);

router.get(
  "/",
  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.getAll
);

router.post(
  "/:id/comments",
  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.createComment
);

router.put(
  "/:postId/comments/:commentId",
  JwtInstance.authenticate(Object.values(ROLES)),
  HelpDeskController.editComment
);

export const help_desk = router;
