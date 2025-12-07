import mongoose from "mongoose";
import taskSchema from "./Task.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
    secretKey: {
      type: String,
      trim: true,
    },
    tasks: [taskSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

