"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = void 0;
const mongoose_1 = require("mongoose");
const connectToMongoDB = async (url) => {
    (0, mongoose_1.connect)(url)
        .then(() => {
        console.log("Connect to database successfully.");
    })
        .catch((error) => {
        console.log(error);
    });
};
exports.connectToMongoDB = connectToMongoDB;
