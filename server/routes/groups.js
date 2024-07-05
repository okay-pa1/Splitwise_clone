import express from "express";
import User from "../models/usercreds.js";
import Group from "../models/groups.js";
const router = express.Router();

router.post("/creategroup/:userid", async (req, res, next) => {
  const newGroup = new Group({
    groupname: req.body.groupname,
    members: req.body.members,
  });
  try {
    const savedGroup = await newGroup.save();
    await User.findByIdAndUpdate(req.params.userid, {
      $push: { groups: savedGroup._id },
    });
    res.status(200).json("Created Group");
  } catch (err) {
    next(err);
  }
});

//get all groups
router.get("/getallgroups/:userid", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userid);
    const groups = user.groups;
    res.status(200).json(groups);
  } catch (err) {
    next(err);
  }
});

//deleting groups
router.delete("/deletegroup/:userid/:id", async (req, res, next) => {
  try {
    const userId = req.params.userid;
    await Group.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(userId, {
      $pull: { groups: req.params.id },
    });
    res.status(200).json("Deleted group");
  } catch (err) {
    next(err);
  }
});

export default router;
