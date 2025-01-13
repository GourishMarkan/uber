import { validationResult } from "express-validator";
import { Ride } from "../models/ride.model.js";
import { getDistanceTimeService } from "./maps.service.js";
import crypto from "crypto";

export async function getFareService(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("pickup and destination are required");
  }
  const distanceTime = await getDistanceTimeService(pickup, destination);
  console.log("distanceTime:", distanceTime);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };
  return fare;
}

function getOtp(num) {
  function generateOtp(num) {
    return crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
  }
  return generateOtp(num);
}

export const createRideService = async ({
  userId,
  pickup,
  destination,
  vehicleType,
}) => {
  console.log(userId, pickup, destination, vehicleType);
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFareService(pickup, destination);

  const ride = await Ride.create({
    user: userId,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

export const confirmRideService = async ({ rideId, captain }) => {
  if (!rideId) throw new Error("Ride id is required");

  // updating ride with captain details

  await Ride.findOneAndUpdate(
    { _id: rideId },
    {
      captain: captain._id,
      status: "confirmed",
    }
  );

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  return ride;
};

export const startRideService = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain) throw new Error("All fields are required");
  const ride = await Ride.findOne({ _id: rideId })
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted yet");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }
  await Ride.findOneAndUpdate(
    { _id: rideId },
    {
      status: "ongoing",
    }
  );
  return ride;
};

export const endRideService = async ({ rideId, captain }) => {
  if (!rideId || !captain) throw new Error("All fields are required");
  const ride = await Ride.findOne({ _id: rideId, captain: captain._id })
    .populate("captain")
    .populate("user")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await Ride.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};
