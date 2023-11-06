import express from "express";

import chatController from "../controllers/chatController.js";
import { jwtVerify } from "../middleware/jwtVerify.js";

const chatRouter = express.Router();

chatRouter.post("/", jwtVerify, chatController.accessChat);
chatRouter.get("/", jwtVerify, chatController.fetchChats);
chatRouter.post("/group", jwtVerify, chatController.createGroupChat);
chatRouter.put("/renameGroup", jwtVerify, chatController.renameGroup);
chatRouter.post("/add_to_group", jwtVerify, chatController.addToGroup);
chatRouter.put("/remove_from_group", jwtVerify, chatController.removeFromGroup);
// chatRouter.post("/delete_group", jwtVerify, chatController.deleteGroup);

export default chatRouter;
