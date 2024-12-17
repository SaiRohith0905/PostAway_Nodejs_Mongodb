import express from "express";
import CommentsController from "./comments.controller.js";

const CommentRouter = express.Router();

const commentController = new CommentsController();

CommentRouter.get("/:postId", (req, res) => {
  commentController.getCommentsByPostId(req, res);
});

CommentRouter.post("/:postId", (req, res) => {
  commentController.addCommentToPostByPostId(req, res);
});

CommentRouter.put("/:commentId", (req, res) => {
  commentController.updateCommentToPostByPostId(req, res);
});

CommentRouter.delete("/:commentId", (req, res) => {
  commentController.deleteCommentToPostByPostId(req, res);
});

export default CommentRouter;
