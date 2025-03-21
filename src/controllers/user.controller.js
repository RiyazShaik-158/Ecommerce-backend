const User = require("../models/user.model");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isUserThere = await User.findOne({ email });
    if (isUserThere) {
      res.send(403).json({
        message: "User already exist!",
      });
    }
    const newUser = new User({ name, email, password });
    const savedNewUser = await newUser.save();
    res.status(201).json({ message: "New User created!", data: savedNewUser });
  } catch (err) {
    res.status(500).json({ message: `Server error : ${err.message}` });
  }
};

module.exports = { createUser };
