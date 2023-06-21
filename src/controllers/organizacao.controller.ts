import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../database";
import { hash } from "bcryptjs";

class OrganizacaoController {
  async all(req: FastifyRequest, res: FastifyReply) {
    try {
      const organizacao = await prisma.organizacao.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
          cep: true,
          endereco: true,
          whatsapp: true,
          pets: true,
        },
      });
      return res.status(200).send(organizacao);
    } catch (error) {
      return res.status(400).send({ message: "Error" });
    }
  }

  async create(req: FastifyRequest, res: FastifyReply) {
    const schemaBody = z.object({
      nome: z.string(),
      email: z.string().email(),
      cep: z.string().min(8).max(8),
      endereco: z.string(),
      whatsapp: z.string().max(18),
      password: z.string(),
    });

    const { nome, cep, email, endereco, password, whatsapp } = schemaBody.parse(
      req.body
    );

    const passwordHash = await hash(password, 10);
    try {
      const organizacao = await prisma.organizacao.create({
        data: {
          nome,
          email,
          cep,
          endereco,
          whatsapp,
          password: passwordHash,
        },
      });

      return res.status(201).send(organizacao);
    } catch (error) {
      return res.status(400).send({ message: "Error" });
    }
  }
}

export default new OrganizacaoController();
