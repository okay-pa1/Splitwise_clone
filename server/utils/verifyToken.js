import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import express from "express";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Invalid token"));
    req._user = user;
    next();
  });
};

export default verifyToken;
