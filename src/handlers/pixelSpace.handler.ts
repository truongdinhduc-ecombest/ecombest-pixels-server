import { FastifyRequest, FastifyReply } from "fastify";
import PixelSpace from "../models/pixelSpace/pixelSpace.model";
import { response } from "../utils/response.util";

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as any;
  const pixelSpace = await PixelSpace.findById(id);
  response(reply, 200, pixelSpace);
}

export async function createOne(request: FastifyRequest, reply: FastifyReply) {
  const payload = request.body;
  const newPixelSpace = new PixelSpace(payload);
  await newPixelSpace.save();
  response(reply, 201, newPixelSpace);
}
