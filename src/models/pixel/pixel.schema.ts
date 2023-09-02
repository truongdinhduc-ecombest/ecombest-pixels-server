import { Schema } from "mongoose";

export const pixelSchema = new Schema(
  {
    width: { type: Number, required: true },
    top: { type: Number, required: true },
    left: { type: Number, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);
