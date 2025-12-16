const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.db_url);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
