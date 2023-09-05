import { FastifyInstance } from "fastify";
import { defaultHandler } from "../handlers/default.handler";
import { createOnePixel, getManyPixels } from "./pixel.route";
import {
  createOnePixelSpace,
  getManyPixelSpaces,
  getOnePixelSpace,
} from "./pixelSpace.route";

export default function registerRoutes(server: FastifyInstance) {
  server.get("/", defaultHandler);
  server.route(createOnePixel);
  server.route(getManyPixels);
  server.route(createOnePixelSpace);
  server.route(getOnePixelSpace);
  server.route(getManyPixelSpaces);
}
