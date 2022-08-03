import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get and Post methods for follows
router.get("/follows", async (req, res) => {
  const follows = await prisma.follows.findMany();
  res.json(follows);
});

router.post("/follows", async (req, res) => {
  const result = await prisma.follows.create({
    data: req.body,
  });
  res.json(result);
});

// Get, Put and Delete methods for follows by id
router.get("/follows/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getFollow = await prisma.follows.findUnique({
      where: { id: Number(id) },
    });
    if (getFollow) {
      res.json(getFollow);
    } else {
      res.json({ error: `Follow with id: ${id} does not exist` });
    }
  } catch (e) {
    res.json({ error: `Follow with id: ${id} does not exist` });
  }
});

router.put("/follows/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateFollow = await prisma.follows.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updateFollow);
  } catch (e) {
    res.json({ error: `Follow with id: ${id} does not exist` });
  }
});

router.delete("/follows/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteFollow = await prisma.follows.delete({
      where: { id: Number(id) },
    });
    res.json(deleteFollow);
  } catch (e) {
    res.json({ error: `Follow with id: ${id} does not exist` });
  }
});

export default router;