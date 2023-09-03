import { FastifyReply } from "fastify";

export const response = (
  reply: FastifyReply,
  statusCode: number,
  options: {
    data?: any;
    error?: any;
    message?: string;
  } = {}
) => {
  const { data, error, message } = options;
  reply.code(statusCode).send({
    statusCode,
    data,
    error,
    message,
  });
};
