"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelSpaceSchema = void 0;
const mongoose_1 = require("mongoose");
exports.pixelSpaceSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    waitingTime: { type: Number, required: true },
    pixelSettings: {
        width: { type: Number, required: true },
        color: { type: String, required: true },
    },
}, { timestamps: true });
