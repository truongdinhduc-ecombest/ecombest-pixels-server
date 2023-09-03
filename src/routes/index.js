"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_handler_1 = require("../handlers/default.handler");
const pixel_route_1 = require("./pixel.route");
const cors_1 = __importDefault(require("@fastify/cors"));
function default_1(server) {
    server.register(cors_1.default);
    server.get("/", default_handler_1.defaultHandler);
    server.route(pixel_route_1.createOnePixel);
    server.route(pixel_route_1.getManyPixels);
}
exports.default = default_1;
