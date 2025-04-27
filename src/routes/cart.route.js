const express = require("express");
const { addToCart } = require("../controllers/cart.controller");

const router = express.Router();

router.post("/", addToCart);

module.exports = router;
