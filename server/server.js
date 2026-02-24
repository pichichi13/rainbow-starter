import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";

dotenv.config({ path: "./server/.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

// 🔐 Rotta protetta
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Accesso consentito",
    user: req.user,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
