"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (reply, options) => {
    const { statusCode, data, error, message } = options;
    reply.code(statusCode).send({
        statusCode,
        data,
        error,
        message,
    });
};
exports.response = response;
