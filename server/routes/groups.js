import express from "express";
import User from "../models/usercreds.js";
import Group from "../models/groups.js";
import verifyToken from "../utils/verifyToken.js";
const router = express.Router();

router.post("/creategroup", verifyToken, async (req, res, next) => {
  const newGroup = new Group({
    groupname: req.body.groupname,
    members: req.body.members,
  });
  try {
    const savedGroup = await newGroup.save();
    await Promise.all(
      req.body.members.map(async (username) => {
        await User.findOneAndUpdate(
          { username },
          { $push: { groups: savedGroup._id } }
        );
      })
    );
    res.status(200).json("Created Group");
  } catch (err) {
    next(err);
  }
});

//get all groups
router.get("/getallgroups", verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req._user.id);
    const groupIds = user.groups;
    const groups = await Promise.all(groupIds.map((id) => Group.findById(id)));
    res.status(200).json(groups);
  } catch (err) {
    next(err);
  }
});

//deleting groups
router.delete("/deletegroup/:id", verifyToken, async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    await Group.findByIdAndDelete(req.params.id);
    const members = group.members;
    await Promise.all(
      members.map(async (username) => {
        await User.findOneAndUpdate(
          { username },
          { $pull: { groups: req.params.id } }
        );
      })
    );
    res.status(200).json("Deleted group");
  } catch (err) {
    next(err);
  }
});

export default router;
