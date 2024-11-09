import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const user = await prisma.user.findUnique({
    where: {
      id: request.user.sub,
    },
    select: {
      id: true,
      email: true,
      name: true,
      created_at: true,
    },
  });

  return reply.status(200).send({
    user,
  });
}

export async function getUserById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    id: z.string(),
  });

  const { id } = requestBodySchema.parse(request.params);

  const user = await prisma.user.findUnique({
    where: {
      id: id as string,
    },
    select: {
      id: true,
      email: true,
      name: true,
      created_at: true,
    },
  });

  if (!user) {
    return reply.status(404).send({
      error: "User not found",
    });
  }

  return reply.status(200).send({
    user,
  });
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const user = await prisma.user.findUnique({
    where: {
      id: request.user.sub,
    },
  });

  if (!user) {
    return reply.status(404).send({
      error: "User not found",
    });
  }

  const updateBodySchema = z.object({
    id: z.string(),
    name: z.string(),
    password: z.string().min(6).optional(),
  });

  const { name, password } = updateBodySchema.parse(request.body);

  const password_hash = password ? await hash(password, 6) : undefined;

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name,
      password_hash,
    },
  });

  return reply.status(200).send({
    message: "User updated successfully",
  });
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return reply.status(200).send({
    message: "User deleted successfully",
  });
}
