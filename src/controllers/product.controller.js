const decidePagination = require("../middleware/pagination");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const returnValidErrorMessage = require("../utils/validateMongoDBError");

const getProducts = async (req, res) => {
  const { page, pageSize } = req.query;
  console.log("obtained params", page, pageSize);
  try {
    const { userId } = req;

    const isOurUser = await User.findOne({ _id: userId });

    if (!isOurUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const productsData = await Product.find();

    if (productsData.length === 0) {
      return res.status(200).json({ message: "Success", data: [] });
    }

    res.status(200).json({
      message: "Success",
      data:
        !page && !pageSize
          ? productsData
          : decidePagination(productsData, page, pageSize),
    });
  } catch (err) {
    res.status(500).json({ message: `Server Error ${err.message}` });
  }
};

const createProduct = async (req, res) => {
  const { role } = req;
  const { name, category, selling_price, total_price, manufacturer, rating } =
    req.body;

  try {
    if (role === "user") {
      return res.status(403).json({ message: "Access denied" });
    }

    const obtainedProductDetails = new Product({
      name,
      category,
      selling_price,
      total_price,
      manufacturer,
      rating,
    });

    const savingNewProduct = await obtainedProductDetails.save();

    res
      .status(201)
      .json({ message: "New Product added", data: savingNewProduct });
  } catch (err) {
    const outputMessages = returnValidErrorMessage(err.errors);

    return res.status(500).json({ message: `${outputMessages}` });
  }
};

module.exports = { getProducts, createProduct };
