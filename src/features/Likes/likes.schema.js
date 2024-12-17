import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  value: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
});

export const LikesModel = mongoose.model("Likes", likesSchema);
