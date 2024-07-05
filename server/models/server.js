const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Expense = require("./models/expense");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 3001;
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB using Mongoose");
});

let val = 1;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
