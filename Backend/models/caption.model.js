import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const captionSchema = mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastName: {
        type: String,
        minlength: [3, "First name must be at least 3 characters long"],
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      // regx,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "deactive",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [3, "color of car must be of 3 character"],
      },
      plate: {
        type: String,
        required: true,
        minlength: [3, "Plate must be at least 3 characters long"],
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, "Capacity must be at least 1"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "motocycle", "auto", "activa"],
      },
    },
    location: {
      ltd: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  { timeStamps: true }
);

captionSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

captionSchema.methods.comparePassword = async function (password) {
  // console.log("inside this", this.password); ,;
  // console.log(password);
  const result = await bcrypt.compare(password, this.password);
  // console.log("result", result);
  return result;
};

captionSchema.methods.generateJwtToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};
export const Caption = mongoose.model("Caption", captionSchema);
