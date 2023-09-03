import fastify from "fastify";
import routes from "./src/routes";
import { connectToMongoDB } from "./src/utils/database.util";
import { config } from "dotenv";

config();
const server = fastify();
connectToMongoDB(process.env.MONGODB_URL ?? "");
routes(server);

server.listen({ port: Number(process.env.PORT) ?? 80 }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
