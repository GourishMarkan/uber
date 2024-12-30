import express from "express";
import { body } from "express-validator";
import { auth } from "../middleware/Auth.js";
const router = express.Router();

router.post(
  "/create",
  auth,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid destination"),
  body("vehicleType")
    .isString()
    .isIn(["car", "auto", "moto"])
    .withMessage("invalid vehicle type")
);
export default router;