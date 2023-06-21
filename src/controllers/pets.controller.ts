import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database";
import { z } from "zod";

class PetsController {
  async all(req: FastifyRequest, res: FastifyReply) {
    try {
      const pets = await prisma.pets.findMany();
      return res.status(200).send(pets);
    } catch (error) {
      return res.status(200).send({ message: error });
    }
  }

  async create(req: FastifyRequest, res: FastifyReply) {
    const schemaBody = z.object({
      nome: z.string(),
      sobre: z.string(),
      idade: z
        .string()
        .refine((value) => value === "filhote" || value === "Adulto", {
          message: "A idade deve ser 'filhote' ou 'Adulto'",
        }),
      porte: z
        .string()
        .refine(
          (value) =>
            value === "pequeno" || value === "medio" || value === "grande",
          {
            message: "O porte deve ser 'pequeno', 'medio' ou 'grande'",
          }
        ),
      nivelEnergia: z
        .string()
        .refine(
          (value) =>
            value === "pouca" || value === "media" || value === "muita",
          {
            message: "O nivel de energia deve ser 'pouca', 'media' ou 'muita'",
          }
        ),
      ambiente: z
        .string()
        .refine(
          (value) =>
            value === "pequeno" || value === "medio" || value === "amplo",
          {
            message: "O ambiente deve ser 'pequeno', 'medio' ou 'amplo'",
          }
        ),
      organizacaoId: z.string(),
    });

    const { ambiente, idade, nivelEnergia, nome, organizacaoId, porte, sobre } =
      schemaBody.parse(req.body);

    try {
      const pet = await prisma.pets.create({
        data: {
          nome,
          sobre,
          idade,
          porte,
          nivelEnergia,
          ambiente,
          organizacaoId,
        },
      });

      return res.status(201).send(pet);
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  }
}

export default new PetsController();
