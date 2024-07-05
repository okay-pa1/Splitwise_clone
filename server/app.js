import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import groupRoute from "./routes/groups.js";
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Database");
  } catch (e) {
    throw e;
  }
};

mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

//middlewares
app.use("/auth", authRoute);
app.use("/group", groupRoute);
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  connect();
  console.log("server listening on port number 5000");
});
