"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPixelEventListeners = void 0;
const addPixelEventListeners = (socket, io) => {
    socket.on("placePixel", async (pixel) => {
        const { pixelSpaceId } = pixel;
        if (pixelSpaceId) {
            socket.to(pixelSpaceId).emit("placedPixel", pixel);
        }
    });
};
exports.addPixelEventListeners = addPixelEventListeners;
