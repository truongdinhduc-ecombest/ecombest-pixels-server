"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOne = exports.getOne = void 0;
const pixelSpace_model_1 = __importDefault(require("../models/pixelSpace/pixelSpace.model"));
const response_util_1 = require("../utils/response.util");
async function getOne(request, reply) {
    const { id } = request.params;
    const pixelSpace = await pixelSpace_model_1.default.findById(id);
    (0, response_util_1.response)(reply, { statusCode: 200, data: pixelSpace });
}
exports.getOne = getOne;
async function createOne(request, reply) {
    const payload = request.body;
    const newPixelSpace = new pixelSpace_model_1.default(payload);
    await newPixelSpace.save();
    (0, response_util_1.response)(reply, { statusCode: 201, data: newPixelSpace });
}
exports.createOne = createOne;
