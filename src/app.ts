import fastify from "fastify";
import { initRoutes } from "./routes";

export const app = fastify();

initRoutes(app);
