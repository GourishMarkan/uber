import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Caption } from "../models/caption.model.js";
import { BlacklistToken } from "../models/blacklist.model.js";
export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const blacklistToken = await BlacklistToken.findOne({ token });
    if (blacklistToken) return res.status(401).json({ error: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    // console.log("Auth middleware - after:", req.query);
    next();
  } catch (error) {
    console.log("error while authenciating", error);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

export const authCaption = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // const { token } = req.cookies || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const blacklistToken = await BlacklistToken.findOne({ token });
    console.log("blacklistToken", blacklistToken);
    if (blacklistToken) {
      return res.status(401).json({ error: "Unauthorized / Blacklist" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const caption = await Caption.findById(decoded._id);
    console.log("caption", caption);
    req.caption = caption;
    next();
  } catch (error) {
    console.log("error while authenciating caption", error);
    res.status(401).json({ message: "Unauthorized Caption" });
  }
};
