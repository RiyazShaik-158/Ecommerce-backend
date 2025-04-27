const CartModel = require("../models/cart.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const returnValidErrorMessage = require("../utils/validateMongoDBError");

const addToCart = async (req, res) => {
  const { userId } = req;
  const { product, quantity, total_price, selling_price } = req.body;

  try {
    const isProductPresent = await Product.find({ _id: product });

    const isUserPresent = await User.find({ _id: userId });

    if (!isUserPresent) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!isProductPresent) {
      return res.status(404).json({ message: "Product not available" });
    }

    const newCartItem = new CartModel({
      product,
      user: userId,
      quantity,
      total_price,
      selling_price,
    });

    const savingNewItem = await newCartItem.save();

    res
      .status(201)
      .json({ message: "New Item added to Cart", data: savingNewItem });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};

module.exports = { addToCart };
