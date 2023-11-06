import express from "express";
import userController from "../controllers/userController.js";
import { jwtVerify } from "../middleware/jwtVerify.js";

const userRouter = express.Router();

userRouter.post("/", userController.registerUser);
userRouter.post("/login", userController.loginUser);

// protected
userRouter.get("/", jwtVerify, userController.filterUsers);

export default userRouter;
