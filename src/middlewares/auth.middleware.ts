import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
}
