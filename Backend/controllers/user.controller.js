import { BlacklistToken } from "../models/blacklist.model.js";
import { User } from "../models/user.model.js";
import { z } from "zod";
const userRegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),

  firstName: z
    .string()
    .min(3, { message: "first name should be of 3 character" }),
  lastName: z
    .string()
    .min(3, { message: "last name should be of 3 character" })
    .optional(),

  password: z.string().min(8, { message: "password should be 8 char" }),
});
export const register = async (req, res) => {
  const isValid = userRegisterSchema.safeParse(req.body);
  if (!isValid.success) {
    return res.status(400).json({ error: isValid.error });
  }
  const { firstName, lastName, password, email } = req.body;
  if (!firstName || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res
      .status(400)
      .json({ message: "User already exists", success: false });
  const user = await User.create({
    fullName: {
      firstName,
      lastName,
    },
    password,
    email,
  });
  const token = await user.GenerateJwtToken();
  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };
  // res.cookie;
  // .cookie("token", token, options)
  return res.status(200).json({
    success: true,
    user: user,
    message: "User registered successfully",
    token,
  });
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "password should be 8 char" }),
});

export const login = async (req, res) => {
  const isValid = loginSchema.safeParse(req.body);
  if (!isValid) {
    return res.status(400).json({ error: isValid.error });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = await user.GenerateJwtToken();
  const options = {
    // expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000),
    // secure: false,
    httpOnly: false,
    sameSite: "Lax",
  };
  res.status(200).cookie("token", token, options, { path: "/" }).json({
    success: true,
    message: "User logged in successfully",
    user,
    token,
  });
};

export const getUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user: req.user,
  });
};

export const logout = async (req, res) => {
  // clear cookie
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000),
    httpOnly: true,
  };
  const token = req.cookies.token;
  const blacklistToken = await BlacklistToken.create({ token });
  res.clearCookie("token", "", options).json({
    success: true,
    message: "USer loggesd out successfully",
  });
};
