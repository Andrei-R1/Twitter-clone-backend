import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get and Post methods for users
router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      tweets: true,
      likes: true,
      comments: true,
      followedBy: true,
      following: true,
    },
  });
  res.json(users);
});

router.post("/users", async (req, res) => {
  const result = await prisma.user.create({
    data: req.body,
  });
  res.json(result);
});

// Get, Put and Delete methods for users by id
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        tweets: true,
        likes: true,
        comments: true,
        followedBy: true,
        following: true,
      },
    });
    if (getUser) {
      res.json(getUser);
    } else {
      res.json({ error: `User with id: ${id} does not exist` });
    }
  } catch (e) {
    res.json({ error: `User with id: ${id} does not exist` });
  }
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updateUser);
  } catch (e) {
    res.json({ error: `User with id: ${id} does not exist` });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json(deleteUser);
  } catch (e) {
    res.json({ error: `User with id: ${id} does not exist` });
  }
});

export default router;