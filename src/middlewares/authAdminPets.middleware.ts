import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database";
import { z } from "zod";

export async function authAdmMiddlewarePets(
  req: FastifyRequest,
  res: FastifyReply
) {
  const schemaBody = z.object({
    organizacaoId: z.string(),
  });

  const { organizacaoId } = schemaBody.parse(req.body);
  console.log(organizacaoId);
  try {
    const sub: any = await req.jwtVerify();

    const organizacaoExiste = await prisma.organizacao.findFirst({
      where: {
        id: sub.sub,
      },
    });

    if (!organizacaoExiste) {
      return res.status(404).send({ message: "Organização não encontrada." });
    }

    if (sub.sub !== organizacaoId) {
      return res.status(401).send({ message: "Você não tem permissão." });
    }
  } catch (error) {
    return res.status(500).send({ message: "teste" });
  }
}
