"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_handler_1 = require("../handlers/default.handler");
const pixel_route_1 = require("./pixel.route");
const pixelSpace_route_1 = require("./pixelSpace.route");
function registerRoutes(server) {
    server.get("/", default_handler_1.defaultHandler);
    server.route(pixel_route_1.createOnePixel);
    server.route(pixel_route_1.getManyPixels);
    server.route(pixelSpace_route_1.createOnePixelSpace);
    server.route(pixelSpace_route_1.getOnePixelSpace);
    server.route(pixelSpace_route_1.getManyPixelSpaces);
}
exports.default = registerRoutes;
