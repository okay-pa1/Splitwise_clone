import express from "express";
import { createError } from "../utils/error.js";
import Expense from "../models/expense.js";
import Group from "../models/groups.js";
const router = express.Router();

router.post("/newexpenses/:groupid", async (req, res, next) => {
  console.log("Received POST request at /newexpenses");
  const { group, numberOfUsers, userNames } = req.body;
  console.log("Request body:", req.body);
  try {
    const dummyRecord = new Expense({
      group,
      numberOfUsers,
      userNames,
      expenses: new Array(numberOfUsers).fill(0),
    });
    const result = await dummyRecord.save();
    await Group.findByIdAndUpdate(req.params.id, {
      $push: { expenses: result._id },
    });
    await Group.findByIdAndUpdate(
      req.params.id,
      {
        $set: { latestexpense: result._id },
      },
      { new: true }
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Error inserting record", err);
    next(err);
    // res.status(500).json({ error: "Failed to insert record" });
  }
});

router.get("/singleexpenses/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await Expense.findById(id);
    if (!user) {
      return next(createError(404, "expense doesnt exist"));
      //   res.status(404).json({ error: "expense doesnt exist" });
    }
    res.json(user);
  } catch (err) {
    next(err);
    // res.status(500).json({ error: "Failed to get expense details" });
  }
});

router.put("/singleexpenses/:id", async (req, res, next) => {
  const Id = req.params.id;
  const newexpense = req.body.newexpense;

  try {
    const user = await Expense.findByIdAndUpdate(
      Id,
      { $set: { expenses: newexpense } },
      { new: true }
    );
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    next(err);
  }
});

export default router;
