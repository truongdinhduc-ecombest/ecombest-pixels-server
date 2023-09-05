import { Socket, Server } from "socket.io";

export const addPixelEventListeners = (socket: Socket, io: Server) => {
  socket.on(
    "placePixel",
    async (pixel: {
      pixelSpaceId: string;
      width: number;
      top: number;
      left: number;
      color: string;
    }) => {
      const { pixelSpaceId } = pixel;
      if (pixelSpaceId) {
        socket.to(pixelSpaceId).emit("placedPixel", pixel);
      }
    }
  );
};
