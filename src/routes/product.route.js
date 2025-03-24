const express = require("express");
const {
  getProducts,
  createProduct,
} = require("../controllers/product.controller");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getProducts).post("/", verifyToken, createProduct);

module.exports = router;
