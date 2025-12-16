const app = require("./index.js");
const dotenv = require("dotenv");
const connectDB = require("./db.js");

dotenv.config({ path: "./config.env" });

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 9000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
