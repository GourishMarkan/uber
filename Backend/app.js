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
import bodyParser from "body-parser";
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// module.exports = app;
import userRouter from "./routes/user.route.js";
import captionRouter from "./routes/caption.route.js";
import mapRouter from "./routes/map.route.js";
import RideRouter from "./routes/ride.route.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/caption", captionRouter);
app.use("/api/v1/maps", mapRouter);
app.use("/api/v1/ride", RideRouter);
export default app;
