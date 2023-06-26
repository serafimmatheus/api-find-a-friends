import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database";
import { z } from "zod";

interface IPropsSub {
  sub: string;
}

class PetsController {
  async all(req: FastifyRequest, res: FastifyReply) {
    try {
      const pets = await prisma.pets.findMany({
        include: {
          petId: true,
        },
      });
      return res.status(200).send(pets);
    } catch (error) {
      return res.status(200).send({ message: error });
    }
  }

  async findByEstadoAndCidade(req: FastifyRequest, res: FastifyReply) {
    const schemaParams = z.object({
      cidade: z.string(),
      estado: z.string(),
    });

    const schemaQueryParams = z.object({
      idade: z.string().optional(),
      energia: z.string().optional(),
      porte: z.string().optional(),
      independencia: z.string().optional(),
    });

    const { idade, energia, porte, independencia } = schemaQueryParams.parse(
      req.query
    );

    const { cidade, estado } = schemaParams.parse(req.params);

    const pets = await prisma.pets.findMany({
      include: {
        petId: true,
      },
    });

    const filterPets = pets.map((pet) => {
      if (
        pet.petId.estado.toLocaleLowerCase() === estado.toLocaleLowerCase() &&
        pet.petId.cidade.toLocaleLowerCase() === cidade.toLocaleLowerCase()
      ) {
        return pet;
      } else {
        return undefined;
      }
    });

    const filterNewPets = filterPets.filter((elem) => elem != null);

    const filterCaracteristicasPets = filterNewPets.map((pet) => {
      if (
        pet?.idade === idade &&
        pet?.nivelEnergia === energia &&
        pet?.porte === porte &&
        pet?.nivelIndependencia === independencia
      ) {
        return pet;
      }
    });

    if (filterCaracteristicasPets.length === 0) {
      return res.status(200).send(filterCaracteristicasPets);
    }

    return res.status(200).send(filterNewPets);
  }

  async create(req: FastifyRequest, res: FastifyReply) {
    const schemaBody = z.object({
      nome: z.string(),
      sobre: z.string(),
      idade: z
        .string()
        .refine((value) => value === "filhote" || value === "adulto", {
          message: "A idade deve ser 'filhote' ou 'adulto'",
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
      nivelIndependencia: z
        .string()
        .refine(
          (value) => value === "baixo" || value === "medio" || value === "alto",
          {
            message:
              "O nivel de independencia deve ser 'baixo', 'medio' ou 'alto'",
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
      gatoOuCachorro: z
        .string()
        .refine((value) => value === "gato" || value === "cachorro", {
          message: "Deve ser 'gato' ou 'cachorro'",
        }),
      organizacaoId: z.string(),
    });

    const {
      ambiente,
      idade,
      nivelEnergia,
      nome,
      organizacaoId,
      porte,
      sobre,
      nivelIndependencia,
      gatoOuCachorro,
    } = schemaBody.parse(req.body);

    const sub: IPropsSub = await req.jwtVerify();

    if (sub.sub !== organizacaoId) {
      return res.status(401).send({ message: "Você não tem permissão." });
    }

    try {
      const pet = await prisma.pets.create({
        data: {
          nome,
          sobre,
          idade,
          porte,
          nivelEnergia,
          nivelIndependencia,
          ambiente,
          organizacaoId,
          gatoOuCachorro,
        },
      });

      return res.status(201).send(pet);
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  }

  async updated(req: FastifyRequest, res: FastifyReply) {
    const schemaBody = z.object({
      nome: z.string(),
      sobre: z.string(),
      idade: z
        .string()
        .refine((value) => value === "filhote" || value === "adulto", {
          message: "A idade deve ser 'filhote' ou 'adulto'",
        })
        .optional(),
      porte: z
        .string()
        .refine(
          (value) =>
            value === "pequeno" || value === "medio" || value === "grande",
          {
            message: "O porte deve ser 'pequeno', 'medio' ou 'grande'",
          }
        )
        .optional(),
      nivelEnergia: z
        .string()
        .refine(
          (value) =>
            value === "pouca" || value === "media" || value === "muita",
          {
            message: "O nivel de energia deve ser 'pouca', 'media' ou 'muita'",
          }
        )
        .optional(),
      nivelIndependencia: z
        .string()
        .refine(
          (value) => value === "baixo" || value === "medio" || value === "alto",
          {
            message:
              "O nivel de independencia deve ser 'baixo', 'medio' ou 'alto'",
          }
        )
        .optional(),
      ambiente: z
        .string()
        .refine(
          (value) =>
            value === "pequeno" || value === "medio" || value === "amplo",
          {
            message: "O ambiente deve ser 'pequeno', 'medio' ou 'amplo'",
          }
        )
        .optional(),
      gatoOuCachorro: z
        .string()
        .refine((value) => value === "gato" || value === "cachorro", {
          message: "Deve ser 'gato' ou 'cachorro'",
        })
        .optional(),
    });

    const {
      ambiente,
      idade,
      nivelEnergia,
      nome,
      porte,
      sobre,
      nivelIndependencia,
      gatoOuCachorro,
    } = schemaBody.parse(req.body);

    const schemaParams = z.object({
      id: z.string(),
    });

    const { id } = schemaParams.parse(req.params);
    try {
      const petsExiste = await prisma.pets.findFirst({
        where: {
          id,
        },
      });

      if (!petsExiste) {
        return res.status(404).send({ message: "Pet não encontrado." });
      }

      const sub: IPropsSub = await req.jwtVerify();

      if (sub.sub !== petsExiste.organizacaoId) {
        return res.status(401).send({ message: "você não tem permissão." });
      }

      await prisma.pets.update({
        where: {
          id: petsExiste.id,
        },

        data: {
          ambiente,
          idade,
          nivelEnergia,
          nome,
          porte,
          sobre,
          nivelIndependencia,
          gatoOuCachorro,
        },
      });
    } catch (error) {}
  }

  async deleted(req: FastifyRequest, res: FastifyReply) {
    const schemaParams = z.object({
      id: z.string(),
    });

    const { id } = schemaParams.parse(req.params);

    try {
      const petsExiste = await prisma.pets.findFirst({
        where: {
          id,
        },
      });

      if (!petsExiste) {
        return res.status(404).send({ message: "Pet não encontrado." });
      }

      const sub: IPropsSub = await req.jwtVerify();

      if (sub.sub !== petsExiste.organizacaoId) {
        return res.status(401).send({ message: "você não tem permissão." });
      }

      await prisma.pets.delete({
        where: { id: petsExiste.id },
      });

      return res.status(204).send();
    } catch (error) {}
  }
}

export default new PetsController();
