import fastify from "fastify";
import { initRoutes } from "./routes";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify();

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
});

app.register(fastifyJwt, {
  secret: env.SECURITY_TOKEN,
});

initRoutes(app);
