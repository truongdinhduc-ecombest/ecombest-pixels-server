"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyPixelSpaces = exports.createOnePixelSpace = exports.getOnePixelSpace = void 0;
const pixelSpace_handler_1 = require("../handlers/pixelSpace.handler");
exports.getOnePixelSpace = {
    url: "/pixel-space/:id",
    method: "get",
    handler: pixelSpace_handler_1.getOne,
};
exports.createOnePixelSpace = {
    url: "/pixel-space/create-one",
    method: "post",
    schema: {
        body: {
            type: "object",
        },
    },
    handler: pixelSpace_handler_1.createOne,
};
exports.getManyPixelSpaces = {
    url: "/pixel-space/get-many",
    method: "get",
    handler: pixelSpace_handler_1.getMany,
};
