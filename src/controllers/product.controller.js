const Product = require("../models/product.model");
const User = require("../models/user.model");

const getProducts = async (req, res) => {
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

    res.status(200).json({ message: "Success", data: productsData });
  } catch (err) {
    res.status(500).json({ message: `Server Error ${err.message}` });
  }
};

const keys = [
  "name",
  "category",
  "selling_price",
  "total_price",
  "manufacturer",
  "rating",
];

const createProduct = async (req, res) => {
  const { role } = req;
  const { name, category, selling_price, total_price, manufacturer, rating } =
    req.body;

  try {
    if (role === "user") {
      return res.status(403).json({ message: "Access denied" });
    }

    const returnEmptyValues = (
      name,
      category,
      selling_price,
      total_price,
      manufacturer,
      rating
    ) => {
      const tempValues = [
        name,
        category,
        selling_price,
        total_price,
        manufacturer,
        rating,
      ];
      const newValuesObj = Object.fromEntries(
        keys.map((item, index) => [item, tempValues[index]])
      );
      return newValuesObj;
    };

    console.log(
      returnEmptyValues(
        name,
        category,
        selling_price,
        total_price,
        manufacturer,
        rating
      )
    );

    if (
      !name ||
      !category ||
      !selling_price ||
      !total_price ||
      !manufacturer ||
      !rating
    ) {
      return res.status(400).json({ message: "Mandatory fields are missing" });
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
    res.status(500).json({ message: `Server error : ${err.message}` });
  }
};

module.exports = { getProducts, createProduct };
