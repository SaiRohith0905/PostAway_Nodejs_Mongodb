import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: mongoose.Schema.Types.String },
});

export const CommentsModel = mongoose.model("comments", commentsSchema);
