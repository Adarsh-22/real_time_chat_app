import jwt from "jsonwebtoken";

import { User } from "../models/userModal.js";

import asyncHandler from "express-async-handler";

export const jwtVerify = asyncHandler(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRECT);
			req.user = await User.findById(decoded.id).select("-password"); // '-' excludes password from selecting

			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not Authorized ,token Failed");
		}
	} else res.status(401).send("User Not Authorized");
});
