const mongoose = require("mongoose");

const cart_schema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, "Product Id is must"],
    },
    userId: {
      type: String,
      required: [true, "Product is must"],
    },
    quantity: {
      type: Number,
      required: [true, "Please specify Quantity"],
    },
    total_price: {
      type: Number,
      required: [true, "Please provide Product price"],
    },
    selling_price: {
      type: Number,
      required: [true, "Please provide Product price"],
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("CartModel", cart_schema);

module.exports = CartModel;
