import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
// const connectDB = require("./db/db");
connectDB();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// module.exports = app;
import userRouter from "./routes/user.route.js";
import captionRouter from "./routes/caption.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/caption", captionRouter);
export default app;