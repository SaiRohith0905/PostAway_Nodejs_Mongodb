import mongoose from "mongoose";

const FriendsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  friendUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  accepted: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  rejected: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  pending: {
    type: mongoose.Schema.Types.Boolean,
    default: true,
  },
});

export const FriendsModel = mongoose.model("Friends", FriendsSchema);
