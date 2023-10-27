import mongoose, { Schema } from "mongoose";

const chatModel = mongoose.Schema(
	{
		chatName: { type: String, trim: true },
		isGroupChat: { type: Boolean, default: false },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		latestmessage: { type: mongoose.Schema.Types.ObjectId, ref: "Messages" },
		groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{
		timeStamps: true,
	}
);

export const Chat = mongoose.model("Chat", chatModel);
