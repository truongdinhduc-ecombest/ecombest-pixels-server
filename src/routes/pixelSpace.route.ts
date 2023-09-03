import { RouteOptions } from "fastify";
import { createOne, getOne } from "../handlers/pixelSpace.handler";

export const getOnePixelSpace: RouteOptions = {
  url: "/pixel-space/:id",
  method: "get",
  handler: getOne,
};

export const createOnePixelSpace: RouteOptions = {
  url: "/pixel-space/create-one",
  method: "post",
  schema: {
    body: {
      type: "object",
    },
  },
  handler: createOne,
};
