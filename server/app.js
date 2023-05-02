import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

app.use(
  session({
    key: process.env.KEY,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: (60 * 1000) * 10,
      httpOnly: true,
    },
  })
);

import authRouter from "./routes/authRouter.js";
app.use(authRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on", PORT));
