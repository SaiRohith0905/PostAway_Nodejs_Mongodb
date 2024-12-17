import express from "express";
import FriendsController from "./friends.controller.js";

const FriendsRouter = express.Router();

const friendsController = new FriendsController();

FriendsRouter.get("/get-friends/:userId", (req, res) => {
  friendsController.getFriendsByUserId(req, res);
});

FriendsRouter.get("/get-pending-requests", (req, res) => {
  friendsController.getPendingFriendRequest(req, res);
});

FriendsRouter.put("/toggle-friendship/:friendId", (req, res) => {
  friendsController.toggleFriendShip(req, res);
});

FriendsRouter.put("/response-to-request/:friendId", (req, res) => {
  friendsController.acceptRejectFriendRequest(req, res);
});

export default FriendsRouter;
