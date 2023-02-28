import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model(
  "players",
  new Schema(
    {
      name: { type: String, require: true },
      image: { type: String, require: true },
      career: { type: String },
      position: { type: String, require: true },
      goals: { type: Number, require: true, default: 0 },
      nation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nations",
        require: true,
      },
      isCaption: { type: Boolean, default: false },
    },
    { timestamps: true }
  )
);
