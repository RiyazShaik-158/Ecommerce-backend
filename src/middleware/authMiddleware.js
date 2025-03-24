const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_token_key = process.env.TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!req.header("Authorization")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, secret_token_key);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ message: "Access denied. No token provided." });
  }
};

module.exports = verifyToken;
