"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMany = exports.createOne = exports.getOne = void 0;
const pixelSpace_model_1 = __importDefault(require("../models/pixelSpace/pixelSpace.model"));
const response_util_1 = require("../utils/response.util");
const error_util_1 = require("../utils/error.util");
async function getOne(request, reply) {
    try {
        const { id } = request.params;
        const pixelSpace = await pixelSpace_model_1.default.findById(id);
        if (!pixelSpace) {
            throw new error_util_1.HandlerError(404, "Pixel space does not exist.");
        }
        (0, response_util_1.response)(reply, 200, { data: pixelSpace });
    }
    catch (error) {
        (0, response_util_1.response)(reply, error === null || error === void 0 ? void 0 : error.statusCode, {
            message: error === null || error === void 0 ? void 0 : error.message,
            error: error === null || error === void 0 ? void 0 : error.error,
        });
    }
}
exports.getOne = getOne;
async function createOne(request, reply) {
    const payload = request.body;
    const newPixelSpace = new pixelSpace_model_1.default(payload);
    await newPixelSpace.save();
    (0, response_util_1.response)(reply, 201, { data: newPixelSpace });
}
exports.createOne = createOne;
async function getMany(request, reply) {
    try {
        const queryParams = request.query;
        const pixelSpaces = await pixelSpace_model_1.default.find(queryParams);
        (0, response_util_1.response)(reply, 200, { data: pixelSpaces });
    }
    catch (error) {
        (0, response_util_1.response)(reply, error === null || error === void 0 ? void 0 : error.statusCode, {
            message: error === null || error === void 0 ? void 0 : error.message,
            error: error === null || error === void 0 ? void 0 : error.error,
        });
    }
}
exports.getMany = getMany;
