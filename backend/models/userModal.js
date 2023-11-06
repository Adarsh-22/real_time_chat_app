import mongoose from "mongoose";

const userModal = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		pic: {
			type: String,
			default: "http://res.cloudinary.com/adarsh002/image/upload/v1699098029/axtembkqoahwxumepy5x.png",
		},
	},
	{
		timestamps: true,
	}
);

export const User = mongoose.model("User", userModal);
