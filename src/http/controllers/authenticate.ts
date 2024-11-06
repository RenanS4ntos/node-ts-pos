import { FastifyReply, FastifyRequest } from "fastify";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return reply.status(404).send({
      message: "Invalid credentials.",
    });
  }

  const doesPasswordMatches = await compare(password, user.password_hash);

  if (!doesPasswordMatches) {
    return reply.status(401).send({
      message: "Invalid credentials.",
    });
  }

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
      },
    },
  );

  return reply.status(200).send({
    authToken: token,
  });
}
