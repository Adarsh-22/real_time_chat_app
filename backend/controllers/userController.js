import asyncHandler from "express-async-handler";
import { User } from "../models/userModal.js";
import { generateToken } from "../config/generateToken.js";
import bcrypt from "bcryptjs";

// const hashPassword = async (password) => {
// 	const salt = await bcrypt.genSalt(10);
// 	return await bcrypt.hash(password, salt);
// };

const matchPassword = async (entered, password) => {
	return await bcrypt.compare(entered, password);
};

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, pic } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please Enter All The Fields ");
	}
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}
	const salt = await bcrypt.genSalt(10);

	const hashedPassword = await bcrypt.hash(password, salt);
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
		pic,
	});

	if (user) {
		// console.log(user);
		return res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			pic: user.pic,
			token: generateToken(user.id, user.email),
		});
	} else {
		res.status(500);
		throw new Error("User Was Not Created successfully");
	}
});
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (User && (await matchPassword(password, user.password))) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			pic: user.pic,
			token: generateToken(user.id, user.email),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

export default { registerUser, loginUser };
