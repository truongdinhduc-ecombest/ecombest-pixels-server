"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOne = exports.getOne = void 0;
const PixelSpace_1 = __importDefault(require("../models/PixelSpace"));
const response_util_1 = require("../utils/response.util");
async function getOne(request, reply) {
    const { id } = request.params;
    const pixelSpace = await PixelSpace_1.default.findById(id);
    (0, response_util_1.response)(reply, 200, pixelSpace);
}
exports.getOne = getOne;
async function createOne(request, reply) {
    const payload = request.body;
    const newPixelSpace = new PixelSpace_1.default(payload);
    await newPixelSpace.save();
    (0, response_util_1.response)(reply, 201, newPixelSpace);
}
exports.createOne = createOne;