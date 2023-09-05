"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPixelSpaceEventListeners = void 0;
const addPixelSpaceEventListeners = (socket, io) => {
    socket.on("joinPixelSpace", async (data) => {
        const { pixelSpaceId } = data;
        if (pixelSpaceId) {
            socket.join(pixelSpaceId);
            const totalOnlineUsers = (await io.in(pixelSpaceId).fetchSockets())
                .length;
            io.to(pixelSpaceId).emit("joinedPixelSpace", { totalOnlineUsers });
        }
    });
    socket.on("leavePixelSpace", async (data) => {
        const { pixelSpaceId } = data;
        if (pixelSpaceId) {
            socket.leave(pixelSpaceId);
            const totalOnlineUsers = (await io.in(pixelSpaceId).fetchSockets())
                .length;
            io.to(pixelSpaceId).emit("leftPixelSpace", { totalOnlineUsers });
        }
    });
};
exports.addPixelSpaceEventListeners = addPixelSpaceEventListeners;
