"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMany = exports.createOne = void 0;
const pixel_model_1 = __importDefault(require("../models/pixel/pixel.model"));
const response_util_1 = require("../utils/response.util");
async function createOne(request, reply) {
    try {
        const payload = request.body;
        const { pixelSpaceId, top, left } = payload;
        const existedPixel = await pixel_model_1.default.findOne({ pixelSpaceId, top, left });
        if (existedPixel) {
            throw new Error("Pixel placed already.");
        }
        const newPixel = new pixel_model_1.default(payload);
        await newPixel.save();
        (0, response_util_1.response)(reply, { statusCode: 201, data: newPixel });
    }
    catch (error) {
        (0, response_util_1.response)(reply, { statusCode: 201, error: "Something went wrong." });
    }
}
exports.createOne = createOne;
async function getMany(request, reply) {
    const queryParams = request.query;
    const pixels = await pixel_model_1.default.find(queryParams);
    (0, response_util_1.response)(reply, { statusCode: 200, data: pixels });
}
exports.getMany = getMany;
