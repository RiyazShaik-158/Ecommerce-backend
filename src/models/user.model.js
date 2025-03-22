const mongoose = require("mongoose");

const user_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    userName: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", user_schema);

module.exports = User;
