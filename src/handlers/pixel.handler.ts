import { FastifyRequest, FastifyReply } from "fastify";
import Pixel from "../models/Pixel";
import { response } from "../utils/response.util";

export async function createOne(request: FastifyRequest, reply: FastifyReply) {
  const payload = request.body;
  const newPixel = new Pixel(payload);
  await newPixel.save();
  response(reply, 201, newPixel);
}

export async function getMany(request: FastifyRequest, reply: FastifyReply) {
  const queryParams = request.query as any;
  const pixels = await Pixel.find(queryParams);
  response(reply, 200, pixels);
}
