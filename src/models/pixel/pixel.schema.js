"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelSchema = void 0;
const mongoose_1 = require("mongoose");
exports.pixelSchema = new mongoose_1.Schema({
    width: { type: Number, required: true },
    top: { type: Number, required: true },
    left: { type: Number, required: true },
    color: { type: String, required: true },
    pixelSpaceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "pixel-spaces",
        required: true,
    },
}, { timestamps: true });
