import axios from "axios";
import { Caption } from "../models/caption.model.js";

export const getAddressCoordinateService = async (address) => {
  // const apiKey = apiKey1;
  const apiKey = process.env.GOOGLE_MAPS_API;
  const google_base_url = process.env.GOOGLE_MAPS_URL;

  const url = `${google_base_url}/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch location");
    }
  } catch (error) {
    console.log("error in getAddressCoordinate", error);
    throw error;
  }
};

export const getDistanceTimeService = async (origin, destination) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const google_base_url = process.env.GOOGLE_MAPS_URL;
  if (!origin || !destination) {
    throw new Error("origin and destination are required");
  }
  const url = `${google_base_url}/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    // console.log("url", url);
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (res.data.status === "OK") {
      if (res.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No route found");
      }
      return res.data.rows[0].elements[0];
    }
  } catch (error) {
    console.error("error while getting distance time", error);
    throw error;
  }
};

export const getAutoCompleteSuggestionsService = async (input) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const google_base_url = process.env.GOOGLE_MAPS_URL;
  if (!input) {
    throw new Error("query is required");
  }
  const url = `${google_base_url}/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;
  try {
    const res = await axios.get(url, { withCredentials: true });
    if (res.data.status === "OK") {
      // console.log("res.data.predictions", res.data.predictions);
      return res.data.predictions
        .map((prediction) => prediction.description)
        .filter((value) => value);
    } else {
      throw new Error("unable to fetch suggestions");
    }
  } catch (error) {
    console.error("erorr while getting autocomplete suggestions", error);
    throw error;
  }
};

export const getCaptainsInTheRadiusService = async (ltd, lng, raduis) => {
  // radius in kilo meters
  const captains = await Caption.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], raduis / 6371],
      },
    },
  });
  return captains;
};
