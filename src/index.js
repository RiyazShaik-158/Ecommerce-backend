const express = require("express");
const connectDB = require("./db/db");
const UserRouter = require("./routes/user.route");
const ProductRouter = require("./routes/product.route");
const AuthRouter = require("./routes/auth.route");
const CartRouter = require("./routes/cart.route");
const cors = require("cors");
const verifyToken = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors(process.env.FRONTEND_URL));
const port = 8900;

app.use("/users", UserRouter);
app.use("/auth", AuthRouter);
app.use("/products", verifyToken, ProductRouter);
app.use("/cart", verifyToken, CartRouter);

const startingServer = () => {
  app.listen(port, () => {
    console.log(`Server is live on port: ${port}`);
  });
};

connectDB(startingServer);
