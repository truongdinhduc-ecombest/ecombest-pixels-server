import { RouteOptions } from "fastify";
import { createOne, getMany } from "../handlers/pixel.handler";

export const createOnePixel: RouteOptions = {
  url: "/pixel/create-one",
  method: "post",
  schema: {
    body: {
      type: "object",
    },
  },
  handler: createOne,
};

export const getManyPixels: RouteOptions = {
  url: "/pixel/get-many",
  method: "get",
  handler: getMany,
};
