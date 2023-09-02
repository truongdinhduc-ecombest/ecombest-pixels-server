import { FastifyInstance } from "fastify";
import { defaultHandler } from "../handlers/default.handler";
import { createOnePixel, getManyPixels } from "./pixel.route";
import cors from "@fastify/cors";

export default function (server: FastifyInstance) {
  server.register(cors);
  server.get("/", defaultHandler);
  server.route(createOnePixel);
  server.route(getManyPixels);
}
