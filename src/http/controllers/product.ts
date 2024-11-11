import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const products = await prisma.product.findMany();

  return reply.status(200).send({
    products,
  });
}

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    name: z.string(),
    price: z.number(),
    category_id: z.string(),
  });

  const { name, price, category_id } = requestBodySchema.parse(request.body);

  const doesCategoryExist = await prisma.category.findUnique({
    where: {
      id: category_id,
    },
  });

  if (!doesCategoryExist) {
    return reply.status(404).send({
      error: "Category not found",
    });
  }

  await prisma.product.create({
    data: {
      name,
      price,
      category_id,
    },
  });

  return reply.status(201).send();
}

export async function updateProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    category_id: z.string().optional(),
  });

  const { id } = request.params as { id: string };
  const { name, price, category_id } = requestBodySchema.parse(request.body);

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      category_id,
    },
  });

  return reply.status(200).send({
    message: "Product updated!",
    data: {
      product,
    },
  });
}
