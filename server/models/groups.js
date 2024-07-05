import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
  expenses: {
    type: [String],
  },
  lastestexpense: {
    type: String,
  },
});

const Group = new mongoose.model("Groups", groupSchema);

export default Group;
