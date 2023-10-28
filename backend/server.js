import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import colors from "colors";

import userRouter from "./routes/userRoutes.js";
import { errHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config(); // cofigure env
connectDB();
const app = express();
app.use(express.json()); //to accept json Data

app.get("/", (req, res) => {
	console.log("Welcome to Server");
	return res.json("Hello");
});

app.use("/api/user", userRouter);

// err handlers
app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on port ${PORT}`.yellow.bold));
