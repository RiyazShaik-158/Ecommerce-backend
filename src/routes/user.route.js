const express = require("express");
const {
  createUser,
  getUsers,
  loginUser,
} = require("../controllers/user.controller");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createUser).post("/auth", loginUser).get("/", getUsers);

module.exports = router;
