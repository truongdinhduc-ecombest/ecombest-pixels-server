"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpServer = void 0;
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const setUpServer = (server) => {
    server.register(cors_1.default);
    server.register(fastify_socket_io_1.default, {
        cors: {
            origin: "*",
        },
    });
};
exports.setUpServer = setUpServer;
