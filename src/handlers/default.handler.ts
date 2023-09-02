import { FastifyReply, FastifyRequest } from "fastify";

export function defaultHandler(request: FastifyRequest, reply: FastifyReply) {
  return "Hello world!";
}
