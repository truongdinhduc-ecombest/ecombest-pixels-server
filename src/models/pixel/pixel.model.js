"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pixel_schema_1 = require("./pixel.schema");
exports.default = (0, mongoose_1.model)("pixels", pixel_schema_1.pixelSchema);
