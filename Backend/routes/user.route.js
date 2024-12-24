import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/Auth.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getUser);
router.get("/logout", auth, logout);
export default router;
