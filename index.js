"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("./src/routes"));
const database_util_1 = require("./src/utils/database.util");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const server = (0, fastify_1.default)();
(0, database_util_1.connectToMongoDB)("mongodb+srv://truongdinhduc:truongdinhduc@cluster0.m0la3ey.mongodb.net/ecombest-pixels");
(0, routes_1.default)(server);
server.listen({ port: 8080 }, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
