"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("./src/routes"));
const database_util_1 = require("./src/utils/database.util");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const server = (0, fastify_1.default)();
(0, database_util_1.connectToMongoDB)((_a = process.env.MONGODB_URL) !== null && _a !== void 0 ? _a : "");
(0, routes_1.default)(server);
server.listen({
    host: (_b = process.env.HOST) !== null && _b !== void 0 ? _b : "0.0.0.0",
    port: (_c = Number(process.env.PORT)) !== null && _c !== void 0 ? _c : 3000,
}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
