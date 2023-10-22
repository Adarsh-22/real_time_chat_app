import express from "express";
import dotenv from "dotenv";

const app = express();

// cofigure env
dotenv.config();

app.get("/", (req, res) => {
	console.log("Welcome to Server");
	return res.json("Hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
