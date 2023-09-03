import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { defaultHandler } from "../handlers/default.handler";
import { createOnePixel, getManyPixels } from "./pixel.route";
import { createOnePixelSpace, getOnePixelSpace } from "./pixelSpace.route";

export default function (server: FastifyInstance) {
  server.register(cors);
  server.get("/", defaultHandler);
  server.route(createOnePixel);
  server.route(getManyPixels);
  server.route(createOnePixelSpace);
  server.route(getOnePixelSpace);
}
