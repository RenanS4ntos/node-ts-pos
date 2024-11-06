import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getCategories(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const categories = await prisma.category.findMany();

  return reply.status(200).send({
    categories,
  });
}

export async function createCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    name: z.string(),
  });

  const { name } = requestBodySchema.parse(request.body);

  const doesCategoryExist = await prisma.category.findUnique({
    where: {
      id: name,
    },
  });

  if (doesCategoryExist) {
    return reply.status(404).send({
      error: "Category already exists",
    });
  }

  await prisma.category.create({
    data: {
      name,
    },
  });

  return reply.status(201).send();
}

export async function updateCategory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    id: z.string(),
    name: z.string().optional(),
  });

  const { id, name } = requestBodySchema.parse(request.body);

  await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  return reply.status(200).send({
    message: "Category updated",
  });
}
