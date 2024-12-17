import PostRepository from "../Posts/post.repository.js";
import { PostModel } from "../Posts/post.schema.js";
import CommentsRepository from "./comments.repository.js";
import { CommentsModel } from "./comments.schema.js";

export default class CommentsController {
  //   async getCommentsByPostId(req, res) {
  //     const userId = req.userId;
  //     const { postId } = req.params;
  //     const { message } = req.body;
  //   }

  constructor() {
    this.commentRepository = new CommentsRepository();
    this.postRepository = new PostRepository();
  }

  async addCommentToPostByPostId(req, res) {
    const userId = req.userId;
    const { postId } = req.params;
    const { message } = req.body;
    // we will check if post exists
    try {
      const postFound = await this.postRepository.findPost(postId);
      //if post not found we will throw error
      if (!postFound) {
        console.log("Post not found");
        return res.status(404).json({ error: "Post not found" });
      }
      //if post exists we need to chcek if user already commented on post,
      const existingComment = await this.commentRepository.findOneComment(
        postId,
        userId
      );

      if (existingComment) {
        return res
          .status(404)
          .json({ error: "User has already commented on the post" });
      }

      //if comment doesnot exist we need create a new comment
      const newComment = await this.commentRepository.createNewComment(
        postId,
        userId,
        message
      );

      //Need to add this new commentid to user collection and post collection
      postFound.comments.push(newComment._id);
      await postFound.save();

      // await UserModel.findByIdAndUpdate(
      //   { _id: userId },
      //   { $push: { comments: newComment._id } }
      // );

      return res.status(201).send({
        message: "new comment successfully added",
        comment: newComment,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCommentsByPostId(req, res) {
    const { postId } = req.params;

    // Validate postId

    try {
      // Find the post by postId and populate the comments array
      // const comments = await CommentsModel.find({ postId: postId });
      // return res.send(comments);

      const postFound = await PostModel.findById(postId)
        .populate({
          path: "comments", // Populating comments array
          populate: { path: "userId", select: "name email" }, // Populating userId inside each comment
        })
        .exec();

      if (!postFound) {
        return res.status(404).send("Post not found");
      }

      // Check if the post has comments
      if (!postFound.comments.length) {
        return res.status(404).send({
          message: "There are no comments for the given postId",
          comments: null,
        });
      }

      return res.status(200).send({
        message: "Comments fetched successfully for the given postId",
        comments: postFound.comments, // Populated comments with userId details
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("An error occurred while fetching comments");
    }
  }

  async updateCommentToPostByPostId(req, res) {
    try {
      const { message } = req.body;
      const { commentId } = req.params;

      const comment = await this.commentRepository.getCommentByCommentId(
        commentId
      );
      console.log(comment, "comment", commentId);
      if (!comment) {
        return res.status(404).send({
          message: "comment not Found",
        });
      }
      comment.message = message;
      const updatedComment = await comment.save();

      return res.status(200).send(updatedComment);
    } catch (error) {}
  }

  async deleteCommentToPostByPostId(req, res) {
    try {
      const { commentId } = req.params;

      const comment = await this.commentRepository.getCommentByCommentId(
        commentId
      );
      if (!comment) {
        return res.status(404).send({
          message: "comment not Found",
        });
      }

      await this.commentRepository.deleteComment(commentId);

      return res.send(200).send({
        message: "comment deleted Successfully",
      });
    } catch (error) {}
  }
}
