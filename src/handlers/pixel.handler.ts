import { FastifyRequest, FastifyReply } from "fastify";
import Pixel from "../models/pixel/pixel.model";
import { response } from "../utils/response.util";

export async function createOne(request: FastifyRequest, reply: FastifyReply) {
  try {
    const payload = request.body as any;
    const { pixelSpaceId, top, left } = payload;
    const existedPixel = await Pixel.findOne({ pixelSpaceId, top, left });
    if (existedPixel) {
      throw new Error("Pixel placed already.");
    }
    const newPixel = new Pixel(payload);
    await newPixel.save();
    response(reply, { statusCode: 201, data: newPixel });
  } catch (error) {
    response(reply, { statusCode: 201, error: "Something went wrong." });
  }
}

export async function getMany(request: FastifyRequest, reply: FastifyReply) {
  const queryParams = request.query as any;
  const pixels = await Pixel.find(queryParams);
  response(reply, { statusCode: 200, data: pixels });
}
