import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requried: true,
      unique: true,
    },
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
    groups: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", UserSchema);

export default User;
