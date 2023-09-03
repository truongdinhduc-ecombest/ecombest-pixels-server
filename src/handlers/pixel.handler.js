"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMany = exports.createOne = void 0;
const pixel_model_1 = __importDefault(require("../models/pixel/pixel.model"));
const response_util_1 = require("../utils/response.util");
async function createOne(request, reply) {
    const payload = request.body;
    const newPixel = new pixel_model_1.default(payload);
    await newPixel.save();
    (0, response_util_1.response)(reply, 201, newPixel);
}
exports.createOne = createOne;
async function getMany(request, reply) {
    const pixels = await pixel_model_1.default.find();
    (0, response_util_1.response)(reply, 200, pixels);
}
exports.getMany = getMany;
