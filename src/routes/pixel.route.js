"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyPixels = exports.createOnePixel = void 0;
const pixel_handler_1 = require("../handlers/pixel.handler");
exports.createOnePixel = {
    url: "/pixel/create-one",
    method: "post",
    schema: {
        body: {
            type: "object",
        },
    },
    handler: pixel_handler_1.createOne,
};
exports.getManyPixels = {
    url: "/pixel/get-many",
    method: "get",
    handler: pixel_handler_1.getMany,
};
