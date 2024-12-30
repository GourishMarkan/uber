import { validationResult } from "express-validator";
import {
  getDistanceTimeService,
  getAutoCompleteSuggestionsService,
  getAddressCoordinateService,
} from "../services/maps.service.js";

export const getCoordinates = async (req, res) => {
  // console.log("getCoordinates");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: "false", errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinateService(address);
    return res.status(200).json({ success: "true", coordinates });
  } catch (error) {
    console.log("error in getCoordinates", error);
    return res.status(500).json({ error: "Internal Server Error:", error });
  }
};

export const getDistanceTime = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: "false", errors: errors.array() });
    }
    console.log("req.query (init)", req.query);
    const { origin, destination } = req.query;
    if (!origin || !destination) {
      return res.status(400).json({
        success: "false",
        error: "Missing required query parameters: origin and destination",
      });
    }
    console.log("origin:", origin, "destination:", destination);
    const distanceTime = await getDistanceTimeService(origin, destination);
    return res.status(200).json({
      success: "true",
      distanceTime,
    });
  } catch (error) {
    console.log("error in getDistanceTime", error);
    return res.status(500).json({ error: "Internal Server Error:", error });
  }
};

export const getAutoCompleteSuggestions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: "false", errors: errors.array() });
    }
    const { input } = req.query;
    const suggestions = await getAutoCompleteSuggestionsService(input);
    return res.status(200).json({ succes: "true", suggestions });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
