import fastify from "fastify";
import routes from "./src/routes";
import { connectToMongoDB } from "./src/utils/database.util";
import { config } from "dotenv";

config();
const server = fastify();
connectToMongoDB(process.env.MONGODB_URL ?? "");
routes(server);

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
