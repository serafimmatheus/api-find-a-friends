import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../database";
import { compare, hash } from "bcryptjs";
import nodemailer from "nodemailer";
import { env } from "../env";

class OrganizacaoController {
  async login(req: FastifyRequest, res: FastifyReply) {
    const schemaBody = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = schemaBody.parse(req.body);

    try {
      const organizacao = await prisma.organizacao.findFirst({
        where: {
          email: email,
        },
      });

      if (!organizacao?.isActivated) {
        return res
          .status(401)
          .send({ message: "Usuário ainda não ativou sua conta." });
      }

      if (!organizacao) {
        return res.status(401).send({ message: "Usuário inválidos" });
      }

      const isPasswordTrue = await compare(password, organizacao.password);

      if (!isPasswordTrue) {
        return res.status(401).send({ message: "Senha inválidos" });
      }

      const token = await res.jwtSign(
        {},
        { sign: { sub: organizacao.id, expiresIn: "1d" } }
      );

      return res
        .status(201)
        .send({ token, user: { ...organizacao, password: undefined } });
    } catch (error) {}
  }

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
          estado: true,
          cidade: true,
          pets: true,
        },
      });
      return res.status(200).send(organizacao);
    } catch (error) {
      return res.status(400).send({ message: "Error" });
    }
  }

  async findById(req: FastifyRequest, res: FastifyReply) {
    const schemaParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = schemaParams.parse(req.params);

    try {
      const data = await prisma.organizacao.findFirst({
        where: {
          id,
        },
      });

      return res.status(200).send(data);
    } catch (error) {
      return res.status(200).send({ message: "Organizacão não encontrada." });
    }
  }

  async findByName(req: FastifyRequest, res: FastifyReply) {
    const schemaParams = z.object({
      nome: z.string(),
    });

    const { nome } = schemaParams.parse(req.params);
    try {
      const data = await prisma.organizacao.findMany({
        where: {
          organizacao: {
            contains: nome,
            mode: "insensitive",
          },
        },

        include: {
          pets: true,
        },
      });

      return res.status(200).send(data || []);
    } catch (error) {}
  }

  async create(req: FastifyRequest, res: FastifyReply) {
    const schemaBody = z.object({
      nome: z.string(),
      organizacao: z.string(),
      email: z.string().email(),
      cep: z.string().min(8).max(8),
      estado: z.string(),
      cidade: z.string(),
      endereco: z.string(),
      whatsapp: z.string().max(18),
      password: z.string(),
    });

    const {
      nome,
      cep,
      email,
      endereco,
      password,
      whatsapp,
      organizacao,
      cidade,
      estado,
    } = schemaBody.parse(req.body);

    const passwordHash = await hash(password, 10);
    try {
      const data = await prisma.organizacao.create({
        data: {
          nome,
          email,
          cep,
          endereco,
          whatsapp,
          password: passwordHash,
          organizacao,
          cidade,
          estado,
          isActivated: false,
        },
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: env.USER_EMAIL,
          pass: env.USER_PASSWORD_EMAIL,
        },
        secure: true, // Use SSL/TLS
        tls: {
          rejectUnauthorized: false, // Permita conexões não autorizadas (usado para testes)
        },
      });

      await transporter.sendMail({
        from: env.USER_EMAIL,
        to: email,
        subject: "Bem vindo ao Find A Friend",
        text: "Seja bem vindo ao Find A Friend",
        html: `<h1>Ative sua conta:</h1>
        <a href="https://api-find-a-friends.vercel.app/api/v1/ativar-conta/${data.id}">Ativar conta</a>`,
      });

      return res.status(201).send(data);
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  }

  async updated(req: FastifyRequest, res: FastifyReply) {
    const schemaBody = z.object({
      nome: z.string().optional(),
      organizacao: z.string().optional(),
      email: z.string().email().optional(),
      cep: z.string().min(8).max(8).optional(),
      estado: z.string().optional(),
      cidade: z.string().optional(),
      endereco: z.string().optional(),
      whatsapp: z.string().max(18).optional(),
    });

    const schemaParams = z.object({
      id: z.string(),
    });

    const { id } = schemaParams.parse(req.params);

    const {
      nome,
      cep,
      email,
      endereco,
      whatsapp,
      organizacao,
      cidade,
      estado,
    } = schemaBody.parse(req.body);

    try {
      const organizacaoExiste = await prisma.organizacao.findFirst({
        where: {
          id,
        },
      });

      await prisma.organizacao.update({
        where: {
          id: organizacaoExiste?.id,
        },

        data: {
          nome,
          cep,
          email,
          endereco,
          whatsapp,
          organizacao,
          cidade,
          estado,
        },
      });

      return res.status(204).send();
    } catch (error) {}
  }

  async updatedIsActiveAccount(req: FastifyRequest, res: FastifyReply) {
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

      await prisma.organizacao.update({
        where: {
          id: organizacaoExiste?.id,
        },

        data: {
          isActivated: true,
        },
      });

      return res.status(204).send();
    } catch (error) {}
  }

  async deleted(req: FastifyRequest, res: FastifyReply) {
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

      await prisma.organizacao.delete({
        where: {
          id: organizacaoExiste?.id,
        },
      });

      return res.status(204).send();
    } catch (error) {}
  }
}

export default new OrganizacaoController();
