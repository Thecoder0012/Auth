import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../database/connection.js";
import "dotenv/config";
import transporter from "../mail/mailConfig.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password.toString(), 12);
    const register = await db.query(
      "INSERT INTO users (email,password) VALUES (?,?)",
      [email, hashedPass]
    );

    const mail = await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Registration!",
      text: "Thanks for registering!",
    });
    
    res.status(200).send({ register, message: "You have successfully signed up!" });
  } catch (error) {
       res.status(400).send({message: "This email has already been taken. Try another email"});
  }
});

router.get("/login", (req, res) => {
  const authenticated = !!req.session.user;
  res.status(200).send({ authenticated, user: req.session.user });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await db.query(
      "SELECT * from users where email = ?;",
      email
    );
    const user = users[0];
    if (!!user) {
      const comparePasswords = await bcrypt.compare(
        password.toString(),
        user.password
      );
      if (comparePasswords) {
        req.session.user = user;
        res.status(200).send(user);
      } else {
        res.status(401).send({ message: "Wrong credentials - Try again" });
      }
    } else {
      res
        .status(401)
        .send({ message: "The email has not been registered yet. " });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
  }
});

router.get("/destroy", (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: "Session user_id deleted" });
});

export default router;
