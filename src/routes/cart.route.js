const express = require("express");
const {
  addToCart,
  changeQuantityToAddedItem,
  getCartItems,
} = require("../controllers/cart.controller");

const router = express.Router();

router
  .post("/items", addToCart)
  .patch("/items/:id", changeQuantityToAddedItem)
  .get("/", getCartItems);

module.exports = router;
