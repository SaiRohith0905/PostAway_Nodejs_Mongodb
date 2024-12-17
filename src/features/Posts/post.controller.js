import PostRepository from "./post.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }
  async createPost(req, res) {
    // const {} = req.body;
    const postdata = req.body;
    postdata.userId = req.userId;
    try {
      const newPost = await this.postRepository.createNewPost(postdata);
      if (newPost) {
        return res.status(201).send(newPost);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPosts(req, res) {
    try {
      const allposts = await this.postRepository.getAllPosts();
      return res.status(200).send(allposts);
    } catch (error) {
      console.log(error);
    }
  }

  async getPostByPostId(req, res) {
    const userId = req.userId;
    const { postId } = req.params;
    try {
      const postFound = await this.postRepository.getPostByPostId(
        userId,
        postId
      );
      return res.status(200).send(postFound);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePostByPostId(req, res) {
    const data = req.body;
    const { postId } = req.params;

    if (!data.userId) {
      data.userId = req.userId;
    } else if (data.userId != req.userId) {
      return res.status(403).send({ message: "User Id malformed" });
    }

    try {
      const postUpdatedResponse = await this.postRepository.updateByPostId(
        postId,
        data
      );

      if (!postUpdatedResponse) {
        return res
          .status(404)
          .send({ message: "Post not found or not updated" });
      }

      return res.status(200).send(postUpdatedResponse);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "An error occurred while updating the post." });
    }
  }

  async deletePostByPostId(req, res) {
    const { postId } = req.params;
    const userId = req.userId;

    console.log("User ID:", userId);
    console.log("Post ID:", postId);

    try {
      const postFound = await this.postRepository.getPostByPostId(
        userId,
        postId
      );
      console.log("Post Found:", postFound);

      if (!postFound || postFound.length === 0) {
        return res.status(404).send({
          message: "Post not found or you don't have access to this post.",
        });
      }

      const result = await this.postRepository.deletePostByPostId(postId);
      if (result) {
        return res.status(200).send({ message: "Post successfully deleted." });
      } else {
        return res.status(404).send({
          message: "Post not found during deletion.",
        });
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      return res
        .status(500)
        .send({ message: "An error occurred while deleting the post." });
    }
  }
}
