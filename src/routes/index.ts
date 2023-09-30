import { FastifyInstance } from "fastify";
import organizacaoController from "../controllers/organizacao.controller";
import petsController from "../controllers/pets.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authAdmMiddleware } from "../middlewares/authAdm.middleware";
import { authAdmMiddlewarePets } from "../middlewares/authAdminPets.middleware";

export function initRoutes(app: FastifyInstance) {
  // ROTA LOGIN

  app.post("/api/v1/login", organizacaoController.login);
  // ROTAS DA ORGANIZACAO
  app.get(
    "/api/v1/organizacoes",
    { onRequest: [authMiddleware] },
    organizacaoController.all
  );

  app.get("/api/v1/organizacao/:id", organizacaoController.findById);

  app.get("/api/v1/organizacoes/:nome", organizacaoController.findByName);

  app.post("/api/v1/organizacoes", organizacaoController.create);

  app.patch(
    "/api/v1/organizacoes/:id",
    organizacaoController.updatedIsActiveAccount
  );

  app.get(
    "/api/v1/ativar-conta/:id",
    organizacaoController.updatedIsActiveAccount
  );

  app.delete(
    "/api/v1/organizacoes/:id",
    { onRequest: [authMiddleware, authAdmMiddleware] },
    organizacaoController.deleted
  );

  // ROTAS DO PET
  app.get("/api/v1/pets", petsController.all);

  app.get("/api/v1/pets/:estado/:cidade", petsController.findByEstadoAndCidade);

  app.get("/api/v1/pets/:id", petsController.findById);

  app.get(
    "/api/v1/me/:id/pets",
    { onRequest: [authMiddleware] },
    petsController.fiinByNameOneUser
  );

  app.post(
    "/api/v1/pets",
    { onRequest: [authMiddleware] },
    petsController.create
  );
  app.put(
    "/api/v1/pets/:id",
    { onRequest: [authMiddleware] },
    petsController.updated
  );
  app.delete(
    "/api/v1/pets/:id",
    { onRequest: [authMiddleware] },
    petsController.deleted
  );
}
