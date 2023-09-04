import { RouteOptions } from "fastify";
import { createOne, getMany, getOne } from "../handlers/pixelSpace.handler";

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

export const getManyPixelSpaces: RouteOptions = {
  url: "/pixel-space/get-many",
  method: "get",
  handler: getMany,
};
