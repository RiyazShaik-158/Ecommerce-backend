const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_token_key = process.env.TOKEN_SECRET;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
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
    });
    const savedNewUser = await newUser.save();

    res.status(201).json({ message: "New User created!", savedNewUser });
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
      .json({ message: "Login Successful", data: isUserThere, token });
  } catch (err) {
    res.status(500).json({ message: `Server error : ${err.message}` });
  }
};

const getUsers = async (req, res) => {
  try {
    const usersData = await User.find();
    if (usersData.length === 0) {
      res.status(200).json({ message: `No data`, data: [] });
    }

    res.status(200).json({ data: usersData });
  } catch (err) {
    res.status(500).json({ message: `Server error : ${err.message}` });
  }
};

module.exports = { createUser, getUsers, loginUser };
