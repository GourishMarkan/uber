import {
  confirmRideService,
  createRideService,
  endRideService,
  getFareService,
  startRideService,
} from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getCoordinates } from "./map.controller.js";
import {
  getAddressCoordinateService,
  getCaptainsInTheRadiusService,
} from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { Ride } from "../models/ride.model.js";

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
    res.status(200).json({ success: "true", ride });

    const pickupCoordinates = await getAddressCoordinateService(pickup);

    const captainsInRadius = await getCaptainsInTheRadiusService(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );
    console.log("captainsInRadius", captainsInRadius);
    ride.otp = "";

    const rideWithUser = await Ride.findOne({ _id: ride._id }).populate("user");

    captainsInRadius.map((captain) =>
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      })
    );

    //  );
    // return
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
  const { rideId } = req.body;
  try {
    const ride = await confirmRideService({ rideId, captain: req.user._id });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    return res.status(200).json({
      success: true,
      ride,
    });
  } catch (error) {
    console.log("error in confirmRide", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { rideId, otp } = req.query;
  try {
    const ride = await startRideService({
      rideId,
      otp,
      captain: req.caption._id,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    console.log("error in startRide", error);
    return res.status(500).json({ message: err.message });
  }
};

export const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const { rideId } = req.body;
  try {
    const ride = await endRideService({ rideId, captain: req.caption._id });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
  } catch (error) {
    console.log("error in endRide", error);
    return res.status(500).json({ message: error.message });
  }
};
