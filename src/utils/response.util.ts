import { FastifyReply } from "fastify";

export const response = (
  reply: FastifyReply,
  options: {
    statusCode: number;
    data?: any;
    error?: any;
    message?: string;
  }
) => {
  const { statusCode, data, error, message } = options;
  reply.code(statusCode).send({
    statusCode,
    data,
    error,
    message,
  });
};
