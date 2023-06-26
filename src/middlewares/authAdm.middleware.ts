import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database";
import { z } from "zod";

export async function authAdmMiddleware(
  req: FastifyRequest,
  res: FastifyReply
) {
  const schemaParams = z.object({
    id: z.string(),
  });

  const { id } = schemaParams.parse(req.params);
  try {
    const organizacaoExiste = await prisma.organizacao.findFirst({
      where: {
        id,
      },
    });

    if (!organizacaoExiste) {
      return res.status(404).send({ message: "Organização não encontrada." });
    }

    const sub: any = await req.jwtVerify();

    if (sub.sub !== organizacaoExiste.id) {
      return res.status(401).send({ message: "Você não tem permissão." });
    }
  } catch (error) {}
}
