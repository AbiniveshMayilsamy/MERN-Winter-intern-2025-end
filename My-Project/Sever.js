const app = require("./index.js");
const dotenv = require("dotenv");
const connectDB = require("./db.js");

dotenv.config({ path: "./config.env" });

// Connect to database
connectDB();

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
