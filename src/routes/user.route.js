const express = require("express");
const { createUser } = require("../controllers/user.controller");

const router = express.Router();

router.route("/", createUser);

module.exports = router;
