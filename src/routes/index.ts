import { FastifyInstance } from "fastify";
import organizacaoController from "../controllers/organizacao.controller";
import petsController from "../controllers/pets.controller";

export function initRoutes(app: FastifyInstance) {
  // ROTAS DA ORGANIZACAO
  app.get("/api/v1/organizacoes", organizacaoController.all);
  app.post("/api/v1/organizacoes", organizacaoController.create);

  // ROTAS DO PET
  app.get("/api/v1/pets", petsController.all);
  app.post("/api/v1/pets", petsController.create);
}
