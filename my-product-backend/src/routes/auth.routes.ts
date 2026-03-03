import { Router, Request, Response } from "express";
import authMiddleware, { AuthRequest } from "../middleware/auth.middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //PASSWORD NON HASHATA!!!!! QUINDI IL MATCH FALLISCE SEMPRE
    /*if (user.password !== password) { 
      return res.status(400).json({ message: "Invalid credentials" });
    }*/

    //PASSWORD HASHATA!!! IL MATCH FUNZIONA!
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
    //res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Errore server" });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Utente già esistente" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Utente creato" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore server" });
  }
});

router.post("/seed", async (req, res) => {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const user = await User.create({
    email: "dona@test.com",
    password: hashedPassword,
  });

  res.json(user);
});

export default router;

//Codice prima di avere MongoDB
/*import express from "express";
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
*/
