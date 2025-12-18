const mongoose = require("mongoose");

let dbStatus = { connected: false, message: "" };

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    dbStatus = { connected: true, message: "MongoDB Connected" };
    console.log("MongoDB Connected");
  } catch (error) {
    dbStatus = { connected: false, message: error.message };
    console.error("MongoDB Connection Error:", error.message);
  }
};

const getDBStatus = () => dbStatus;

module.exports = { connectDB, getDBStatus };
