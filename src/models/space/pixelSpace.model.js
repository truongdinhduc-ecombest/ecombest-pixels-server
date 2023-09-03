"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pixelSpace_schema_1 = require("./pixelSpace.schema");
exports.default = (0, mongoose_1.model)("pixel-spaces", pixelSpace_schema_1.pixelSpaceSchema);
