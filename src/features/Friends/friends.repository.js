import { FriendsModel } from "./friends.schema.js";

export default class FriendsRepository {
  async getFriendsByUserId(userId) {
    try {
      return FriendsModel.find({ userId: userId, accepted: true });
    } catch (error) {
      console.log(error);
    }
  }

  async getPendingRequestsForUserId(userId) {
    try {
      const pendingFriends = await FriendsModel.find({
        userId: userId,
        pending: true,
      });

      return pendingFriends;
    } catch (error) {
      console.log(error);
    }
  }

  async checkFriendRequestSent(userId, friendUserId) {
    return await FriendsModel.findOne({
      userId: userId,
      friendUserId: friendUserId,
    });
  }

  async toggleFriendShip(userId, friendUserId) {
    try {
      const newFriendRequestDetails = new FriendsModel({
        userId: userId,
        friendUserId: friendUserId,
      });

      return await newFriendRequestDetails.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findFriendById(friendId, userId) {
    try {
      return await FriendsModel.findOne({
        friendUserId: friendId,
        userId: userId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async actionOnfriendRequest() {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}
