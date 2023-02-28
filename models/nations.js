import mongoose, { ObjectId, Schema } from "mongoose";
export default mongoose.model(
  "nations",
  new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
