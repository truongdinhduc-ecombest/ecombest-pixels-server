import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import socket from "fastify-socket.io";

export const setUpServer = (server: FastifyInstance) => {
  server.register(cors);
  server.register(socket, {
    cors: {
      origin: "*",
    },
  });
};
