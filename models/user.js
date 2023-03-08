import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model(
  "User",
  new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        default: "User Name",
      },
      YOB: {
        type: String,
        default: "1990-01-01",
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
);
