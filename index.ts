import fastify from "fastify";
import { connectToMongoDB } from "./src/utils/database.util";
import { config } from "dotenv";
import registerRoutes from "./src/routes";
import { setUpServer } from "./src/utils/server.util";
import { addPixelSpaceEventListeners } from "./src/socket/pixelSpace.socket";
import { addPixelEventListeners } from "./src/socket/pixel.socket";

config();
connectToMongoDB(process.env.MONGODB_URL ?? "");
const server = fastify();
setUpServer(server);
registerRoutes(server);

server.listen(
  {
    host: process.env.HOST ?? "0.0.0.0",
    port: Number(process.env.PORT) ?? 3000,
  },
  (error, address) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  }
);

server.ready().then(() => {
  server.io.on("connection", (socket) => {
    addPixelSpaceEventListeners(socket, server.io);
    addPixelEventListeners(socket, server.io);
  });
});
