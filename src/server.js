import express from "express";
import cors from "cors";
import "dotenv/config";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionsRoute.js";

const app = express();
const PORT = process.env.PORT;

app.use(rateLimiter)
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoute)

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on ${PORT} port`);
  });
});