import { FastifyInstance } from "fastify";
import organizacaoController from "../controllers/organizacao.controller";
import petsController from "../controllers/pets.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export function initRoutes(app: FastifyInstance) {
  // ROTA LOGIN

  app.post("/api/v1/login", organizacaoController.login);
  // ROTAS DA ORGANIZACAO
  app.get(
    "/api/v1/organizacoes",
    { onRequest: [authMiddleware] },
    organizacaoController.all
  );
  app.post("/api/v1/organizacoes", organizacaoController.create);

  // ROTAS DO PET
  app.get("/api/v1/pets", { onRequest: [authMiddleware] }, petsController.all);
  app.post("/api/v1/pets", petsController.create);
}
