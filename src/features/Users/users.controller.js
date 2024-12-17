import userRepository from "./users.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new userRepository();
  }

  async getAllUserDetails(req, res) {
    try {
      const allDetails = await this.userRepository.getAllUserDetails();
      res.status(200).send(allDetails);
    } catch (error) {
      console.log(error);
    }
  }
  async getDetailsByUserId(req, res) {
    try {
      const { userId } = req.params;
      // console.log(userId, "userId");
      const userFound = await this.userRepository.checkUserByUserId(userId);
      if (!userFound) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      const data = await this.userRepository.getDetailsByUserId(userId);
      // console.log(data, "data");
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  }
  async UpdateDetailsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const userIdJwt = req.userId;
      const data = req.body;

      if (userIdJwt != userId) {
        return res.status(404).send({
          message:
            "token malformed/ You dont have access to perform this action",
        });
      }
      const userFound = await this.userRepository.checkUserByUserId(userId);
      if (!userFound) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      const updatedUser = await this.userRepository.UpdateDetailsByUserId(
        userId,
        data
      );

      const response = this.userRepository.getDetailsByUserId(updatedUser._id);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
    }
  }
}
