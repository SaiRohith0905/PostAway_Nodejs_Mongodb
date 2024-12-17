import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Caption is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  imageURL: {
    type: mongoose.Schema.Types.String,
    required: [true, "Image is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Likes",
    },
  ],
});

export const PostModel = mongoose.model("posts", PostSchema);
