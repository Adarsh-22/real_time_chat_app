import asyncHandler from "express-async-handler";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModal.js";
const accessChat = asyncHandler(async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		console.log("userId Not Sent");
		res.sendStatus(400);
	}

	var isChat = await Chat.find({
		isGroupChat: false,
		$and: [{ users: { $elemMatch: { $eq: req.user._id } } }, { users: { $elemMatch: { $eq: userId } } }],
	})
		.populate("users", "-password")
		.populate("latestMessage");

	isChat = await User.populate(isChat, {
		path: "latsetMessage.sender",
		select: "name pic email",
	});

	if (isChat.length > 0) {
		res.send(isChat[0]);
	} else {
		var chatData = {
			chatName: "",
			isGroupChat: false,
			users: [req.user._id, userId],
		};

		try {
			const createdChat = await Chat.create(chatData);

			const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
			res.status(200).send(FullChat);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}
});

const fetchChats = asyncHandler(async (req, res) => {
	try {
		Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
			.populate("users", "-password")
			.populate("groupAdmin", "-password")
			.populate("latestMessage")
			.sort({ updatedAt: -1 })
			.then(async (results) => {
				results = await User.populate(results, { path: "latestMessage.sender", select: "name pic email" });
				res.status(200).send(results);
			});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});
const createGroupChat = asyncHandler(async (req, res) => {
	if (!req.body.users || !req.body.name) return res.status(400).send("Please fill All The fields");
	var users = JSON.parse(req.body.users);
	if (users.length < 2) return res.status(400).send("More than two usersare required to  form a group chat");
	users.push(req.user._id);
	try {
		const groupChat = await Chat.create({
			chatName: req.body.name,
			users: users,
			isGroupChat: true,
			groupAdmin: req.user._id,
		});
		console.log(groupChat);

		const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		res.status(200).json(fullGroupChat);
	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});
const renameGroup = asyncHandler(async (req, res) => {
	const { chatId, chatName } = req.body;
	const updateChat = await Chat.findByIdAndUpdate(
		chatId,
		{
			chatName: chatName,
		},
		{ new: true } //returns updated record of chat
	)
		.populate("users", "-password")
		.populate("groupAdmin", "-password");

	if (!updateChat) {
		res.status(400).send("Chat not found");
	} else {
		res.json(updateChat);
	}
});
const addToGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
		.populate("users", "-password")
		.populate("groupAdmin", "-password");

	if (added) {
		res.status(200).json(added);
	} else {
		res.status(400);
		throw new Error("Chat not Found");
	}
});
const removeFromGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
		.populate("users", "-password")
		.populate("groupAdmin", "-password");
	console.log(removed);
	if (removed) {
		res.status(200).json(removed);
	} else {
		res.status(400);
		throw new Error("Chat not Found");
	}
});
// const deleteChat = asyncHandler(async (req, res) => {
// 	const { chatId } = req.body;

// 	if (!chatId) return res.status(400).send("Chat Id Not Found");

// 	const chat = await Chat.findOne({ $and: [{ _id: chatId }, { users: { $elemMatch: req.user._id } }] });

// 	if (chat) {
// 		if (chat.isGroupChat === true && chat.groupAdmin._id === req.usr._id) {
// 			await Chat.delete({ _id: chatId }).then((result) => {
// 				res.status(200).send("Chat Deleted Successfully");
// 			});
// 		}
// 	} else {
// 		return res.status(400).send("Only Group Admin Can delete Group Chat");
// 	}
// });

export default { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup };
