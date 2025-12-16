const MenuItem = require("./MenuItem");

console.log("MenuController loaded with Database connection.");

// Get all menu items
exports.getMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json({
      status: "success",
      length: menuItems.length,
      msg: "Menu fetched successfully",
      timeOfHit: req.requestTime,
      data: {
        menuItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error fetching menu",
      error: error.message,
    });
  }
};

// Get single menu item
exports.getSingleMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const singleData = await MenuItem.findById(id);

    if (!singleData) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID or menu item not found",
      });
    }

    res.status(200).json({
      status: "success",
      timeOfHit: req.requestTime,
      data: {
        singleData,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error fetching menu item",
      error: error.message,
    });
  }
};

// Update menu item
exports.putMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const foundItemInfo = await MenuItem.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!foundItemInfo) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID or menu item not found",
      });
    }

    res.status(200).json({
      status: "success",
      timeOfHit: req.requestTime,
      data: {
        foundItemInfo,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error updating menu item",
      error: error.message,
    });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID or menu item not found",
      });
    }

    res.status(200).json({
      status: "success",
      timeOfHit: req.requestTime,
      message: "Menu item deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error deleting menu item",
      error: error.message,
    });
  }
};

// Create new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem({
      id: String(Date.now()),
      ...req.body,
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      status: "success",
      timeOfHit: req.requestTime,
      message: "Menu item created successfully",
      data: {
        savedItem,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error creating menu item",
      error: error.message,
    });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem({
      id: String(Date.now()),
      ...req.body,
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      status: "success",
      timeOfHit: req.requestTime,
      // Corrected variable name
      message: "Menu item created successfully",
      data: {
        savedItem,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error creating menu item",
      error: error.message,
    });
  }
};

module.exports = {
  getMenu,
  getSingleMenuItem,
  putMenuItem,
  deleteMenuItem,
  createMenuItem,
};
