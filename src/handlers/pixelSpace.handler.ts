import { FastifyRequest, FastifyReply } from "fastify";
import PixelSpace from "../models/pixelSpace/pixelSpace.model";
import { response } from "../utils/response.util";
import { HandlerError } from "../utils/error.util";

export async function getOne(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const pixelSpace = await PixelSpace.findById(id);
    if (!pixelSpace) {
      throw new HandlerError(404, "Pixel space does not exist.");
    }
    response(reply, 200, { data: pixelSpace });
  } catch (error: any) {
    response(reply, error?.statusCode, {
      message: error?.message,
      error: error?.error,
    });
  }
}

export async function createOne(request: FastifyRequest, reply: FastifyReply) {
  const payload = request.body;
  const newPixelSpace = new PixelSpace(payload);
  await newPixelSpace.save();
  response(reply, 201, { data: newPixelSpace });
}

export async function getMany(request: FastifyRequest, reply: FastifyReply) {
  try {
    const queryParams = request.query as any;
    const pixelSpaces = await PixelSpace.find(queryParams);
    response(reply, 200, { data: pixelSpaces });
  } catch (error: any) {
    response(reply, error?.statusCode, {
      message: error?.message,
      error: error?.error,
    });
  }
}
