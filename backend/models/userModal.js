import mongoose from "mongoose";

const userModal = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		pic: { type: String, required: true, default: "https://icon-library.com/icon/default-user-icon-3.html.html" },
	},
	{
		timestamps: true,
	}
);

export const User = mongoose.model("User", userModal);
