import { FastifyRequest, FastifyReply } from "fastify";
import Pixel from "../models/pixel/pixel.model";
import { response } from "../utils/response.util";

export async function createOne(request: FastifyRequest, reply: FastifyReply) {
  const payload = request.body;
  const newPixel = new Pixel(payload);
  await newPixel.save();
  response(reply, 201, newPixel);
}

export async function getMany(request: FastifyRequest, reply: FastifyReply) {
  const pixels = await Pixel.find();
  response(reply, 200, pixels);
}
