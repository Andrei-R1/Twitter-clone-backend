import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get and Post methods for tweets
router.get("/tweets", async (req, res) => {
  const tweets = await prisma.tweet.findMany({
    include: {
      user: true,
      likes: true,
      comments: { include: { user: true, }, },
    },
  });
  res.json(tweets);
});

router.post("/tweets", async (req, res) => {
  const result = await prisma.tweet.create({
    data: req.body,
  });
  res.json(result);
});

// Get, Put and Delete methods for tweets by id
router.get("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getTweet = await prisma.tweet.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        likes: true,
        comments: { include: { user: true, }, },
      },
    });
    if (getTweet) {
      res.json(getTweet);
    } else {
      res.json({ error: `Tweet with id: ${id} does not exist` });
    }
  } catch (e) {
    res.json({ error: `Tweet with id: ${id} does not exist` });
  }
});

router.put("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateTweet = await prisma.tweet.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updateTweet);
  } catch (e) {
    res.json({ error: `Tweet with id: ${id} does not exist` });
  }
});

router.delete("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTweet = await prisma.tweet.delete({
      where: { id: Number(id) },
    });
    res.json(deleteTweet);
  } catch (e) {
    res.json({ error: `Tweet with id: ${id} does not exist` });
  }
});

export default router;