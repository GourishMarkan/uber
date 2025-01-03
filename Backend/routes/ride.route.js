import express from "express";
import { body, query } from "express-validator";
import { auth } from "../middleware/Auth.js";
import { createRide, getFare } from "../controllers/ride.controller.js";
const router = express.Router();

router.post(
  "/createRide",
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
    .withMessage("invalid vehicle type"),
  createRide
);

router.get(
  "/get-fare",
  auth,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid destination"),
  getFare
);
export default router;
