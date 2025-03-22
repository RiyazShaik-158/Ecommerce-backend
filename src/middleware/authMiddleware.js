const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_token_key = process.env.TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, secret_token_key);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: `${err.message}` });
  }
};

module.exports = verifyToken;
