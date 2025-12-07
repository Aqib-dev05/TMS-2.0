import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "active", "completed", "failed"],
      default: "new",
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default taskSchema;

