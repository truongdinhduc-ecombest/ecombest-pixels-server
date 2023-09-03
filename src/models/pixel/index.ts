import { model } from "mongoose";
import { pixelSchema } from "./pixel.schema";

export default model("pixels", pixelSchema);
