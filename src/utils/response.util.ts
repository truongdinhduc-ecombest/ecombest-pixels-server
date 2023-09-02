import { FastifyReply } from "fastify";

export const response = (
  reply: FastifyReply,
  statusCode: number,
  data: any,
  message?: string
) => {
  reply.code(statusCode).send({
    statusCode,
    data,
    message,
  });
};
