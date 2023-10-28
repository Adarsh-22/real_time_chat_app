import jwt from "jsonwebtoken";

export const generateToken = (id, email) => {
	return jwt.sign({ id, email }, process.env.JWT_SECRECT, { expiresIn: "30d" });
};
