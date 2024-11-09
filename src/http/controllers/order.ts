import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getOrders(request: FastifyRequest, reply: FastifyReply) {
  const orders = await prisma.order.findMany();

  return reply.status(200).send({
    orders,
  });
}

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    user_id: z.string(),
    product_id: z.string(),
    quantity: z.number(),
  });

  const { product_id, quantity, user_id } = requestBodySchema.parse(
    request.body,
  );

  const doesProductExist = await prisma.product.findUnique({
    where: {
      id: product_id,
    },
  });

  const doesUserExist = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!doesProductExist) {
    return reply.status(404).send({
      error: "Product not found",
    });
  }

  if (!doesUserExist) {
    return reply.status(404).send({
      error: "User not found",
    });
  }

  await prisma.order.create({
    data: {
      product_id,
      user_id,
      quantity,
    },
  });

  return reply.status(201).send();
}

export async function updateOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string };
  const requestBodySchema = z.object({
    user_id: z.string().optional(),
    product_id: z.string().optional(),
    quantity: z.number().optional(),
  });

  const { product_id, quantity, user_id } = requestBodySchema.parse(
    request.body,
  );

  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      product_id,
      user_id,
      quantity,
    },
  });

  console.log(order);

  return reply.status(200).send({
    order,
  });
}
