import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get and Post methods for likes
router.get("/likes", async (req, res) => {
  const likes = await prisma.like.findMany({
    select: {
      id: true,
      user: true,
      tweet: true,
    },
  });
  res.json(likes);
});

router.post("/likes", async (req, res) => {
  const result = await prisma.like.create({
    data: req.body,
  });
  res.json(result);
});

// Get, Put and Delete methods for likes by id
router.get("/likes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getLike = await prisma.like.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        user: true,
        tweet: true,
      },
    });
    if (getLike) {
      res.json(getLike);
    } else {
      res.json({ error: `Like with id: ${id} does not exist` });
    }
  } catch (e) {
    res.json({ error: `Like with id: ${id} does not exist` });
  }
});

router.put("/likes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateLike = await prisma.like.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updateLike);
  } catch (e) {
    res.json({ error: `Like with id: ${id} does not exist` });
  }
});

router.delete("/likes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteLike = await prisma.like.delete({
      where: { id: Number(id) },
    });
    res.json(deleteLike);
  } catch (e) {
    res.json({ error: `Like with id: ${id} does not exist` });
  }
});

export default router;