import { Request, Response } from 'express';
import prisma from './services/prisma';


export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const user = await prisma.user.create({
    data: { name, email },
  });

  res.json(user);
};