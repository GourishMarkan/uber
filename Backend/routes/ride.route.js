import express from "express";
import { body, query } from "express-validator";
import { auth, authCaption } from "../middleware/Auth.js";
import {
  confirmRide,
  createRide,
  endRide,
  getFare,
  startRide,
} from "../controllers/ride.controller.js";
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

router.post(
  "/confirm-ride",
  authCaption,
  body("rideId").isMongoId().withMessage("invalid ride id"),
  confirmRide
);
router.get(
  "/start-ride",
  authCaption,
  query("rideId").isMongoId().withMessage("invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startRide
);

router.post(
  "/end-ride",
  authCaption,
  body("rideId").isMongoId().withMessage("invalid ride id"),
  endRide
);
export default router;
