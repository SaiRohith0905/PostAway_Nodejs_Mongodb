import UserController from "./users.controller.js";
import express from "express";

const UserRouter = express.Router();

const userController = new UserController();

UserRouter.get("/get-details/:userId", (req, res) => {
  userController.getDetailsByUserId(req, res);
});
UserRouter.get("/get-all-details/", (req, res) => {
  userController.getAllUserDetails(req, res);
});
UserRouter.put("/update-all-details/:userId", (req, res) => {
  userController.UpdateDetailsByUserId(req, res);
});

export default UserRouter;
