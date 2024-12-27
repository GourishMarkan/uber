import { BlacklistToken } from "../models/blacklist.model.js";
import { Caption } from "../models/caption.model.js";
import { z } from "zod";
const registerCaptionSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "first name should be of 3 character" }),
  lastName: z
    .string()
    .min(3, { message: "last name should be of 3 character" })
    .optional(),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "password should be 8 char" }),
  color: z.string().min(3, { message: "color should be of 3 character" }),
  plate: z.string().min(3, { message: "plate should be of 3 character" }),
  capacity: z.string().min(1, { message: "capacity should be of 1 character" }),
  vehicleType: z.enum(["car", "motocycle", "auto", "activa"]),
});
export const registerCaption = async (req, res) => {
  const isValid = registerCaptionSchema.safeParse(req.body);
  if (!isValid.success) {
    return res.status(400).json({ error: isValid.error });
  }
  let {
    firstName,
    lastName,
    password,
    email,
    color,
    plate,
    capacity,
    vehicleType,
  } = req.body;
  if (
    !firstName ||
    !password ||
    !email ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const isExistingCap = await Caption.findOne({ email });
  if (isExistingCap)
    return res.status(400).json({ error: "Caption already exists" });
  // converting capacity to number
  // capacity = Number(capacity);
  console.log(" type of capacity", typeof capacity);
  const caption = await Caption.create({
    fullName: {
      firstName,
      lastName,
    },
    password,
    email,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  const token = await caption.generateJwtToken();
  return res.status(200).json({
    success: true,
    caption: caption,
    message: "Caption registered successfully",
    token,
  });
};
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "password should be 8 char" }),
});
export const loginCaption = async (req, res) => {
  const isValid = loginSchema.safeParse(req.body);
  if (!isValid) return res.status(400).json({ error: isValid.error });
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields are required" });
  const caption = await Caption.findOne({ email }).select("+password");
  if (!caption) return res.status(404).json({ error: "Caption not found" });
  const isMatch = await caption.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({ error: "Invalid credentials password" });
  const token = await caption.generateJwtToken();
  // const options = {
  //   expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000),
  //   httpOnly: false,
  //   sameSite: "Strict",
  // };
  const options = {
    // expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000),
    // secure: false,
    httpOnly: false,
    sameSite: "Strict",
  };
  return res.status(200).cookie("token", token, options, { path: "/" }).json({
    success: true,
    caption: caption,
    message: "Caption logged in successfully",
    token,
  });
};

export const getCaption = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Caption fetched successfully",
    caption: req.caption,
  });
};

export const logoutCaption = async (req, res) => {
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000),
    httpOnly: true,
  };
  const { token } = req.cookies;
  const blackListToken = await BlacklistToken.create({ token });
  res.cookie("token", "", options);
  return res.status(200).json({
    message: "caption logged out successfully",
    success: true,
  });
};
