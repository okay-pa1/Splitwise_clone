const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userModel = require("./models/usercreds.js");

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

app.post("/signin", (req, res) => {
  userModel
    .create(req.body)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("Incorrect Password");
        }
      } else {
        res.json("No such user");
      }
    })
    .catch((error) => console.log(error));
});

app.listen(5000, () => {
  connect();
  console.log("server listening on port number 5000");
});
