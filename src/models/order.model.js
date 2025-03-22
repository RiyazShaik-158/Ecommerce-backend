const mongoose = require("mongoose");

const order_schema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "Product Name is required"],
    },
    product_id: {
      type: String,
      required: [true, "Product ID is must"],
    },
    product_price: {
      type: Number,
      required: [true, "Product Price is must"],
    },
    user_id: {
      type: String,
      required: [true, "User is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", order_schema);

module.exports = Order;
