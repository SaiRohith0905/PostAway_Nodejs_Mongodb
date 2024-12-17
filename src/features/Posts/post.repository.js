import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import { PostModel } from "./post.schema.js";

export default class PostRepository {
  async createNewPost(postData) {
    try {
      //creating new post document
      const newPost = new PostModel(postData);
      //saving the newly created document to db
      await newPost.save();
      return newPost;
    } catch (err) {
      console.log(err);
    }
  }

  async findPost(postId) {
    return await PostModel.findOne({ _id: postId });
  }
  async getAllPosts() {
    try {
      const allposts = await PostModel.find().populate("comments");
      return allposts;
    } catch (error) {
      console.log(error);
    }
  }

  async getPostByPostId(userId, postId) {
    try {
      console.log(postId, userId);
      return await PostModel.find({
        userId: new mongoose.Types.ObjectId(userId),
        _id: new mongoose.Types.ObjectId(postId),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateByPostId(postId, data) {
    try {
      const updatedDocument = await PostModel.findOneAndUpdate(
        {
          userId: new mongoose.Types.ObjectId(data.userId),
          _id: new mongoose.Types.ObjectId(postId),
        },
        data,
        {
          new: true,
          overwrite: true,
        }
      );
      return updatedDocument;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePostByPostId(postId) {
    try {
      const result = await PostModel.deleteOne({
        _id: new mongoose.Types.ObjectId(postId),
      });
      return result.deletedCount > 0; // returns true if deletion was successful
    } catch (error) {
      console.log("Error deleting post:", error);
      throw error; // Rethrow for handling in the controller
    }
  }
}
