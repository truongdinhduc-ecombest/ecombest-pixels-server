import { Socket, Server } from "socket.io";

export const addPixelSpaceEventListeners = (socket: Socket, io: Server) => {
  socket.on("joinPixelSpace", async (data: { pixelSpaceId: string }) => {
    const { pixelSpaceId } = data;
    if (pixelSpaceId) {
      socket.join(pixelSpaceId);
      const totalOnlineUsers = (await io.in(pixelSpaceId).fetchSockets())
        .length;
      io.to(pixelSpaceId).emit("joinedPixelSpace", { totalOnlineUsers });
    }
  });

  socket.on("leavePixelSpace", async (data: { pixelSpaceId: string }) => {
    const { pixelSpaceId } = data;
    if (pixelSpaceId) {
      socket.leave(pixelSpaceId);
      const totalOnlineUsers = (await io.in(pixelSpaceId).fetchSockets())
        .length;
      io.to(pixelSpaceId).emit("leftPixelSpace", { totalOnlineUsers });
    }
  });
};
