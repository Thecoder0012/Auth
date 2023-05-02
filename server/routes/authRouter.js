import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../database/connection.js";
const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPass = await bcrypt.hash(password.toString(), 12);
  try {
    const register = await db.query(
      "INSERT INTO users (email,password) VALUES (?,?)",
      [email, hashedPass]
    );
    res
      .status(200)
      .send({ register, message: "You have successfully signed up!" });
  } catch (error) {
    res.status(500).send({
      message: "This email has already been taken. Try another email",
    });
  }
});

router.get("/login", (req, res) => {
  const userSession = req.session.user;
  if (userSession) {
    res.send({ authenticated: true, user: userSession });
  } else {
    res.send({ authenticated: false });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query("SELECT * from users where email = ?;", email);
  const user = result[0][0];
  if (user !== null) {
    const comparePasswords = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (comparePasswords) {
      req.session.user = user;
      res.send(user);
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } else {
    res.status(500).send("No such user exists with the email:" + email);
  }
});

router.get("/destroy", (req, res) => {
  req.session.destroy();
  res.send({ message: "Session user_id deleted" });
});

export default router;
