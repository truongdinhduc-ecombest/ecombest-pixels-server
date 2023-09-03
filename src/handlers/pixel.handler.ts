import { FastifyRequest, FastifyReply } from "fastify";
import Pixel from "../models/pixel/pixel.model";
import { response } from "../utils/response.util";
import { HandlerError } from "../utils/error.util";

export async function createOne(request: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = request.body as any;
    const { pixelSpaceId, top, left } = payload;
    const existedPixel = await Pixel.findOne({ pixelSpaceId, top, left });
    if (existedPixel) {
      throw new HandlerError(302, "Pixel placed already.");
    }
    const newPixel = new Pixel(payload);
    await newPixel.save();
    response(reply, 201, { data: newPixel });
  } catch (error: any) {
    response(reply, error?.statusCode, {
      message: error?.message,
      error: error?.error,
    });
  }
}

export async function getMany(request: FastifyRequest, reply: FastifyReply) {
  const queryParams = request.query as any;
  const pixels = await Pixel.find(queryParams);
  response(reply, 200, { data: pixels });
}
