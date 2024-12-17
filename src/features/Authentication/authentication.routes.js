import express from "express";
import AuthController from "./authentication.controller.js";

const AuthRouter = express.Router();

const authController = new AuthController();

AuthRouter.post("/signup", (req, res) => {
  authController.signUp(req, res);
});

AuthRouter.post("/signin", (req, res) => {
  authController.signIn(req, res);
});

AuthRouter.get("/signout", (req, res) => {
  authController.signOut(req, res);
});

export default AuthRouter;
