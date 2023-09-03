"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (reply, statusCode, data, message) => {
    reply.code(statusCode).send({
        statusCode,
        data,
        message,
    });
};
exports.response = response;
