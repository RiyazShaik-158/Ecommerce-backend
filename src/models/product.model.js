const mongoose = require("mongoose");

const product_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Product name"],
    },
    total_price: {
      type: Number,
      required: [true, "Please provide Product price"],
    },
    selling_price: {
      type: Number,
      required: [true, "Please provide Product price"],
    },
    category: {
      type: String,
      enum: [
        "fashion",
        "electronics",
        "electronicAccessories",
        "homeAndKitchen",
        "toolsAndHardware",
        "sports",
        "outdoors",
        "stationary",
        "books",
        "healthAndHygine",
      ],
      required: [true, "Category is must"],
    },
    manufacturer: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", product_schema);

module.exports = Product;
