import express from "express";
import {
  getCaption,
  loginCaption,
  logoutCaption,
  registerCaption,
} from "../controllers/caption.controller.js";
import { authCaption } from "../middleware/Auth.js";
const router = express.Router();
router.post("/captionRegister", registerCaption);
router.post("/captionLogin", loginCaption);
router.get("/me", authCaption, getCaption);
router.get("/captionLogout", logoutCaption);
export default router;
