import { createRideService, getFareService } from "../services/ride.service.js";
import { validationResult } from "express-validator";

export const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: "false", errors: errors.array() });
  }

  try {
    const userId = req.user._id;
    const { destination, pickup, vehicleType } = req.body;
    // console.log(
    //   "userId",
    //   userId,
    //   "destination",
    //   destination,
    //   "pickup",
    //   pickup,
    //   "vehicleType",
    //   vehicleType
    // );
    const ride = await createRideService({
      userId,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(200).json({ success: "true", ride });
  } catch (error) {
    console.log("error in createRide", error);
    return res.status(500).json({ error: "Internal Server Error:", error });
  }
};
export const getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { pickup, destination } = req.query;
  try {
    const fare = await getFareService(pickup, destination);
    return res.status(200).json({
      success: true,
      fare,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  try {
    // const ride=await
  } catch (error) {
    console.log("error in confirmRide", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
