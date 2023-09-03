import { Schema } from "mongoose";

export const pixelSpaceSchema = new Schema(
  {
    name: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { timestamps: true }
);
