import PostRepository from "../Posts/post.repository.js";
import LikesRepository from "./likes.repository.js";

export default class LikesController {
  constructor() {
    this.likesRepository = new LikesRepository();
    this.postRepository = new PostRepository();
  }

  async getLikeByPostId(req, res) {
    try {
      const { id } = req.params;

      const postFound = this.postRepository.findPost(id);
      if (!postFound) {
        return res.status(404).send({ message: "Post not found" });
      }
      const likes = await this.likesRepository.getLikesByPostId(id);

      return res.status(200).send({
        message: "Likes found for given post",
        likes: likes,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async toggleLikeForPostIdUsingUserId(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      //   check for likes for a give post if not there create one and toggle
      const likeFound = await this.likesRepository.findLikeByUserIdForPostId(
        id,
        userId
      );
      if (!likeFound) {
        const newLikeForUserIdForPostId =
          await this.likesRepository.createNewLikeForUserIdForPostId(
            id,
            userId
          );
        newLikeForUserIdForPostId.value = !newLikeForUserIdForPostId.value;
        const toggledLike = await newLikeForUserIdForPostId.save();
        return res.status(200).send(toggledLike);
      }
      // if like is here for particular user then toggle

      likeFound.value = !likeFound.value;

      const toggledLike = await likeFound.save();
      return res.status(200).send(toggledLike);
    } catch (error) {
      console.log(error);
    }
  }
}
