"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMany = exports.createOne = void 0;
const Pixel_1 = __importDefault(require("../models/Pixel"));
const response_util_1 = require("../utils/response.util");
async function createOne(request, reply) {
    const payload = request.body;
    const newPixel = new Pixel_1.default(payload);
    await newPixel.save();
    (0, response_util_1.response)(reply, 201, newPixel);
}
exports.createOne = createOne;
async function getMany(request, reply) {
    const queryParams = request.query;
    const pixels = await Pixel_1.default.find(queryParams);
    (0, response_util_1.response)(reply, 200, pixels);
}
exports.getMany = getMany;
