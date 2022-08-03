import express from "express";
import morgan from "morgan";
import cors from "cors";

import usersRoutes from "./routes/users.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import likesRoutes from "./routes/likes.routes.js";
import tweetsRoutes from "./routes/tweets.routes.js";
import followsRoutes from "./routes/follows.routes.js";

const app = express();
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());
app.use(usersRoutes);
app.use(commentsRoutes);
app.use(likesRoutes);
app.use(tweetsRoutes);
app.use(followsRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`🚀 App working on port 8000`);
});

app.get("/", (req, res) => {
  res.send("- API is correctly working -");
});
