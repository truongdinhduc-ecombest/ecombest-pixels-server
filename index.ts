import fastify from "fastify";
import routes from "./src/routes";
import { connectToMongoDB } from "./src/utils/database.util";
import { config } from "dotenv";

config();
const server = fastify();
connectToMongoDB(
  "mongodb+srv://truongdinhduc:truongdinhduc@cluster0.m0la3ey.mongodb.net/ecombest-pixels"
);
routes(server);

server.listen({ port: 8080 }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
