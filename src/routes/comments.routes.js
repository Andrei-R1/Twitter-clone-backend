import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get and Post methods for comments
router.get("/comments", async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      tweet: true,
    },
  });
  res.json(comments);
});

router.post("/comments", async (req, res) => {
  const result = await prisma.comment.create({
    data: req.body,
  });
  res.json(result);
});

// Get, Put and Delete methods for comments by id
router.get("/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getComment = await prisma.comment.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        tweet: true,
      },
    });
    if (getComment) {
      res.json(getComment);
    } else {
      res.json({ error: `Comment with id: ${id} does not exist` });
    }
  } catch (e) {
    res.json({ error: `Comment with id: ${id} does not exist` });
  }
});

router.put("/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updateComment);
  } catch (e) {
    res.json({ error: `Comment with id: ${id} does not exist` });
  }
});

router.delete("/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteComment = await prisma.comment.delete({
      where: { id: Number(id) },
    });
    res.json(deleteComment);
  } catch (e) {
    res.json({ error: `Comment with id: ${id} does not exist` });
  }
});

export default router;