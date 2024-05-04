import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/connectDb.js";
import shortUrlRouter from "./routes/shorturl.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();
app.use("/", shortUrlRouter);
app.get("/", (req, res) => {
  res.send("Welcome to shorturl by WebLancerDev");
});

app.listen(8000, () => {
  connectDb(process.env.MONGO_URI);
  console.log("Server is running on port 8000");
});
