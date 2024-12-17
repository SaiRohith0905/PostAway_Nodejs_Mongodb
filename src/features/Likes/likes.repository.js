import { LikesModel } from "./likes.schema.js";

export default class LikesRepository {
  async getLikesByPostId(id) {
    const likes = await LikesModel.find({ postId: id, value: true });
    return likes;
  }

  async findLikeByUserIdForPostId(postId, userId) {
    try {
      const likeFound = await LikesModel.findOne({
        postId: postId,
        userId: userId,
      });
      return likeFound;
    } catch (error) {
      console.log(error);
    }
  }

  async createNewLikeForUserIdForPostId(postId, userId) {
    try {
      const newLikeDoc = new LikesModel({
        postId: postId,
        userId: userId,
      });

      return await newLikeDoc.save();
    } catch (error) {
      console.log(error);
    }
  }
}
