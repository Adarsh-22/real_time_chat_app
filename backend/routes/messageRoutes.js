import express from "express";

import messageController from "../controllers/messageController.js";
import { jwtVerify } from "../middleware/jwtVerify.js";

const messageRouter = express.Router();

messageRouter.post("/", jwtVerify, messageController.sendMessage);
messageRouter.get("/:chatId", jwtVerify, messageController.allMessages);

export default messageRouter;
