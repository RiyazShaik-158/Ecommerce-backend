const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_token_key = process.env.TOKEN_SECRET;

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const isUserThere = await User.findOne({ email });
    if (isUserThere) {
      return res.send(403).json({
        message: "User already exist!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    const superAdminGuy = new User({
      name,
      email,
      password: hashedPassword,
      role: "superAdmin",
    });

    if (role === "admin") {
      const savedNewUser = await newAdmin.save();
      return res
        .status(201)
        .json({ message: "New User created!", savedNewUser });
    } else if (role === "superAdmin") {
      const savedNewUser = await superAdminGuy.save();
      return res
        .status(201)
        .json({ message: "New User created!", savedNewUser });
    } else {
      const savedNewUser = await newUser.save();
      return res
        .status(201)
        .json({ message: "New User created!", savedNewUser });
    }
  } catch (err) {
    res.status(500).json({ message: `Server error : ${err.message}` });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserThere = await User.findOne({ email });
    if (!isUserThere) {
      return res.status(404).json({ message: "User not found!" });
    }

    const checkingPassword = (pass) => {
      return bcrypt.compareSync(pass, isUserThere.password);
    };

    if (!checkingPassword(password)) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const adminList = await User.find({
      $or: [{ role: "admin" }, { role: "superAdmin" }],
    });

    const checkingAdmin = adminList.find((item) => item.email === email);

    const token = jwt.sign(
      {
        userId: isUserThere.id,
        userName: isUserThere.userName,
        email: isUserThere.email,
      },
      secret_token_key,
      {
        expiresIn: "3d",
      }
    );

    res
      .cookie("token", token)
      .status(200)
      .json({
        message: "Login Successful",
        data: isUserThere,
        token,
        role: checkingAdmin ? checkingAdmin.role : "user",
      });
  } catch (err) {
    res.status(500).json({ message: `Server error : ${err.message}` });
  }
};

const getUsers = async (req, res) => {
  const { userId } = req;

  try {
    const obtainedUserData = await User.findOne({ _id: userId });

    if (obtainedUserData.role === "user") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (obtainedUserData.role === "admin") {
      const usersData = await User.find({ role: "user" });

      if (usersData.length === 0) {
        return res.status(200).json({ message: "success", data: [] });
      }

      return res.status(200).json({ message: "success", data: usersData });
    }

    if (obtainedUserData.role === "superAdmin") {
      const usersData = await User.find({ role: "user" || "admin" });

      return res.status(200).json({ message: "success", data: usersData });
    }
  } catch (err) {
    res.status(500).json({ message: `Server error : ${err.message}` });
  }
};

module.exports = { createUser, getUsers, loginUser };
