const Product = require("../models/product.model");

const getProducts = async (req, res) => {
  try {
    const productsData = await Product.find();

    if (productsData.length === 0) {
      return res.status(200).json({ message: "Success", data: [] });
    }

    res.status(200).json({ message: "Success", data: productsData });
  } catch (err) {
    res.status(500).json({ message: `Server Error ${err.message}` });
  }
};

const createProduct = async (req, res) => {
  const { userId, role } = req;
  const { name, category, selling_price, total_price, manufacturer, rating } =
    req.body;

  try {
    if (role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

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

    const obtainedProductDetails = new Product(
      name,
      category,
      selling_price,
      total_price,
      manufacturer,
      rating
    );
    console.log("obtainedProductDetails", obtainedProductDetails);

    res.send("wait bro");
  } catch (err) {
    res.status(500).json({ message: `Server error : ${err.message}` });
  }
};

module.exports = { getProducts, createProduct };
