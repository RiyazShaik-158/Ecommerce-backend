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

const changeQuantityToAddedItem = async (req, res) => {
  const product = req.params.id;
  const { userId } = req;
  const { quantity } = req.body;

  try {
    const isUserPresent = await User.findById(userId);
    if (!isUserPresent) {
      return res.status(404).send("User not found");
    }

    const isProductPresent = await Product.findById(product);
    if (!isProductPresent) {
      return res.status(404).send("Prodcut not available");
    }

    const currentCart = await CartModel.findOne({ user: userId, product });

    if (Number(quantity) === currentCart.quantity) {
      return res.status(200).json({ message: "No changes made" });
    }

    const updatedCartItem = await CartModel.findOneAndUpdate(
      { user: userId, product },
      {
        $set: {
          quantity,
          total_price: currentCart.total_price * 2,
          selling_price: currentCart.selling_price * 2,
        },
      },
      { new: true }
    );

    console.log("updatedCartItem", updatedCartItem);

    res.send("Wait bro");

    res
      .status(200)
      .json({ message: "Updated item quantity in cart", data: updateProduct });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};

const getCartItems = async (req, res) => {
  const { userId } = req;
  try {
    const cartItems = await CartModel.find({ user: userId });

    if (cartItems.length === 0) {
      return res.status(200).json({ message: "No items yet", data: [] });
    }

    res
      .status(200)
      .json({ message: "items fetched successfully", data: cartItems });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToCart, changeQuantityToAddedItem, getCartItems };
