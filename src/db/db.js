const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async (serverStarter) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB successfully");
    serverStarter();
  } catch (error) {
    console.log(`Error connecting server ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
