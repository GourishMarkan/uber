import { createRideService } from "../services/ride.service.js";
import { validationResult } from "express-validator";

export const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: "false", errors: errors.array() });
  }

  try {
    const { userId, destination, pickup, vehicleType } = req.body;
    const ride = await createRideService(
      userId,
      destination,
      pickup,
      vehicleType
    );
    return res.status(200).json({ success: "true", ride });
  } catch (error) {
    console.log("error in createRide", error);
    return res.status(500).json({ error: "Internal Server Error:", error });
  }
};
