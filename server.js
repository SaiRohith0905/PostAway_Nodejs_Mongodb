import express from "express";
import connectToMongoDBUsingMongoose from "./src/Configs/mongoose.config.js";
import cookieParser from "cookie-parser";
import PostRouter from "./src/features/Posts/post.routes.js";
import jwtAuthMiddleware from "./src/middlewares/jwtAuth.middleware.js";
import CommentRouter from "./src/features/Comments/comments.routes.js";
import LikesRouter from "./src/features/Likes/likes.routes.js";
import FriendsRouter from "./src/features/Friends/friends.routes.js";
import AuthRouter from "./src/features/Authentication/authentication.routes.js";
import UserRouter from "./src/features/Users/users.routes.js";

const server = express();

server.use(cookieParser());
server.use(express.json());

server.get("/", (req, res) => {
  return res.send("This is my first backend api application, Welcome!!!");
});

server.use("/api/user", AuthRouter);
server.use("/api/posts", jwtAuthMiddleware, PostRouter);
server.use("/api/comments", jwtAuthMiddleware, CommentRouter);
server.use("/api/likes", jwtAuthMiddleware, LikesRouter);
server.use("/api/friends", jwtAuthMiddleware, FriendsRouter);
server.use("/api/users", jwtAuthMiddleware, UserRouter);

server.listen(3333, () => {
  console.log("Server is listening on port 3333");
  connectToMongoDBUsingMongoose();
});
