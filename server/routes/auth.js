import express from "express";
import User from "../models/usercreds.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPwd,
    });
    await newUser.save();
    res.status(200).send("User created");
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return next(createError(404, "User not found"));
    const isPasswordCrct = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCrct) return next(createError(400, "Incorrect password"));
    res.status(200).send("Logged in");
  } catch (err) {
    next(err);
  }
});

export default router;
