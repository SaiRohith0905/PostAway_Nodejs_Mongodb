import { AuthModel } from "../Authentication/authentication.schema.js";

export default class userRepository {
  async UpdateDetailsByUserId(userId, data) {
    const userFound = await this.checkUserByUserId(userId);
    userFound.email = data.email ?? userFound.email;
    userFound.name = data.name ?? userFound.name;
    userFound.gender = data.gender ?? userFound.gender;
    return await userFound.save();
  }

  async getAllUserDetails() {
    const allDetails = await AuthModel.find({}, { password: 0, comments: 0 });

    return allDetails;
  }
  async getDetailsByUserId(userId) {
    const userDetailsById = await AuthModel.find(
      { _id: userId },
      { password: 0, comments: 0 }
    );

    return userDetailsById;
  }

  async checkUserByUserId(userId) {
    return await AuthModel.findOne({ _id: userId });
  }
}
