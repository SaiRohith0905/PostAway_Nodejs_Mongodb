import express from "express";
import LikesController from "./likes.controller.js";

const LikesRouter = express.Router();

const likesController = new LikesController();

LikesRouter.get("/:id", (req, res) => {
  likesController.getLikeByPostId(req, res);
});

LikesRouter.put("/toggle/:id", (req, res) => {
  likesController.toggleLikeForPostIdUsingUserId(req, res);
});

export default LikesRouter;
