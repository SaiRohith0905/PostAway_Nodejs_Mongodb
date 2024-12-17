import FriendsRepository from "./friends.repository.js";

export default class FriendsController {
  constructor() {
    this.friendsRepository = new FriendsRepository();
  }
  async getFriendsByUserId(req, res) {
    try {
      try {
        const userId = req.userId;
        const friendsList = await this.friendsRepository.getFriendsByUserId(
          userId
        );
        return res.status(200).send(friendsList);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getPendingFriendRequest(req, res) {
    try {
      const userId = req.userId;
      const pendingFriends =
        await this.friendsRepository.getPendingRequestsForUserId(userId);
      return res.status(200).send(pendingFriends);
    } catch (error) {
      console.log(error);
    }
  }

  async toggleFriendShip(req, res) {
    try {
      const userId = req.userId;
      const { friendId } = req.params;

      const friendReqSent = await this.friendsRepository.checkFriendRequestSent(
        userId,
        friendId
      );
      if (friendReqSent) {
        if (friendReqSent.accepted) {
          return res.status(404).send({
            message: "you are already a friend",
          });
        }

        friendReqSent.pending = !friendReqSent.pending;
        friendReqSent.rejected = false;
        const withDrawFriendRequest = await friendReqSent.save();
        return res.status(200).send({
          Message: "Friend request is widrawed",
          details: withDrawFriendRequest,
        });
      }
      const friendRequestDetails =
        await this.friendsRepository.toggleFriendShip(userId, friendId);

      res.status(201).send(friendRequestDetails);
    } catch (error) {
      console.log(error);
    }
  }

  async acceptRejectFriendRequest(req, res) {
    try {
      const { friendId } = req.params;
      const userId = req.userId;
      const { action } = req.body;
      console.log(friendId, "friendID");
      const friendFound = await this.friendsRepository.findFriendById(
        friendId,
        userId
      );
      console.log(friendFound, "friend found");

      if (!friendFound) {
        return res.status(404).send({
          message: "Friend request not found",
        });
      }

      // accept friend req
      if (action) {
        friendFound.accepted = !friendFound.accepted;
        friendFound.pending = !friendFound.pending;

        const newFriendDetails = await friendFound.save();
        return res.status(200).send({
          message: "friend request accepted",
          details: newFriendDetails,
        });
      } else if (!action) {
        // reject friend request

        friendFound.rejected = !friendFound.rejected;
        friendFound.pending = !friendFound.pending;

        const rejectedFriendDetails = await friendFound.save();
        return res.status(200).send({
          message: "friend request rejected",
          details: rejectedFriendDetails,
        });
      } else {
        // invalid action
        return res.status(404).send({
          message: "Invalid action please refer to the swagger",
        });
      }

      //
    } catch (error) {
      console.log(error);
    }
  }
}
