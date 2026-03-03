import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth.routes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server avviato su porta ${PORT}`);
});
