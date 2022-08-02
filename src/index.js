import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 8000, () => {
  console.log(`🚀 App working on port 8000`);
});

app.get("/", (req, res) => {
  res.send("- API is correctly working -");
});