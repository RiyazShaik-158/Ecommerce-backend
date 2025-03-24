const express = require("express");
const connectDB = require("./db/db");
const UserRouter = require("./routes/user.route");
const ProductRouter = require("./routes/product.route");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 8900;

app.use("/users", UserRouter);
app.use("/products", ProductRouter);

const startingServer = () => {
  app.listen(port, () => {
    console.log(`Server is live on port: ${port}`);
  });
};

connectDB(startingServer);
