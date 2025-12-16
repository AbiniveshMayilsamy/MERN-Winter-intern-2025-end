const mongoose = require("mongoose");

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: String,
  isVeg: {
    type: Boolean,
    default: false,
  },
  image: String,
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Export all models
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = {
  MenuItem,
};

const dbcon = mongoose.model("MenuItem", menuItemSchema);
module.exports = dbcon;
