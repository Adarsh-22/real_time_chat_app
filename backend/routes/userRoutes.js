import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", userController.registerUser);
userRouter.post("/login", userController.loginUser);

export default userRouter;
