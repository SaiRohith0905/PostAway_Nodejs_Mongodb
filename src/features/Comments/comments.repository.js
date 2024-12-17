import { CommentsModel } from "./comments.schema.js";
import mongoose from "mongoose";

export default class CommentsRepository {
  async findOneComment(postId, userId) {
    return await CommentsModel.findOne({
      postId: postId,
      userId: userId,
    });
  }

  async createNewComment(postId, userId, message) {
    const newComment = new CommentsModel({
      postId: postId,
      userId: userId,
      message: message,
    });
    await newComment.save();
    return newComment;
  }
  async getCommentByCommentId(commentId) {
    return await CommentsModel.findOne({ _id: commentId });
  }

  async deleteComment(commentId) {
    try {
      const result = await CommentsModel.deleteOne({
        _id: new mongoose.Types.ObjectId(commentId),
      });
      return result.deletedCount > 0; // returns true if deletion was successful
    } catch (error) {
      console.log("Error deleting comment:", error);
      throw error; // Rethrow for handling in the controller
    }
  }
  //   async addCommentToPostByPostId() {}
}
