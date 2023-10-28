import mongoose from "mongoose";

const userModal = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		pic: { type: String, default: "https://icon-library.com/icon/default-user-icon-3.html.html" },
	},
	{
		timestamps: true,
	}
);

export const User = mongoose.model("User", userModal);
