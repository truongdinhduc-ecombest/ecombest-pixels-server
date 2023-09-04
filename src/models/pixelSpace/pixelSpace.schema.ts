import { Schema } from "mongoose";

export const pixelSpaceSchema = new Schema(
  {
    name: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    backgroundColor: { type: String, required: true },
    pixelSettings: {
      width: { type: Number, required: true },
      color: { type: String, required: true },
      waitingTime: { type: Number, required: true },
    },
  },
  { timestamps: true }
);
