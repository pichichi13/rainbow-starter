import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Simuliamo un utente nel database
const fakeUser = {
  id: 1,
  email: "admin@test.com",
  password: await bcrypt.hash("1234", 10), 
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== fakeUser.email) {
    return res.status(401).json({ message: "Utente non trovato" });
  }

  const isMatch = await bcrypt.compare(password, fakeUser.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Password errata" });
  }

  const token = jwt.sign(
    { userId: fakeUser.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default router;
