import express from "express";
import PostController from "./post.controller.js";

const PostRouter = express.Router();

const postController = new PostController();

PostRouter.post("/", (req, res) => {
  postController.createPost(req, res);
});

PostRouter.get("/all", (req, res) => {
  postController.getAllPosts(req, res);
});

PostRouter.get("/:postId", (req, res) => {
  postController.getPostByPostId(req, res);
});

PostRouter.put("/:postId", (req, res) => {
  postController.updatePostByPostId(req, res);
});

PostRouter.delete("/:postId", (req, res) => {
  postController.deletePostByPostId(req, res);
});

export default PostRouter;
