import express from "express";
import cors from "cors";
import "dotenv/config";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

const app = express();

if (process.env.NODE_ENV === "production") job.start();

const PORT = process.env.PORT;

app.use(rateLimiter);
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/transactions", transactionRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on ${PORT} port`);
  });
});