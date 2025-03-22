const express = require("express");
const {
  createUser,
  getUsers,
  loginUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/", createUser).get("/", getUsers).post("/auth", loginUser);

module.exports = router;
