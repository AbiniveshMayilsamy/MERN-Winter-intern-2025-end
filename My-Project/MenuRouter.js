const express = require("express");
const menuController = require("./MenuController");

const menuRouter = express.Router();

menuRouter
  .route("/")
  .get(menuController.getMenu)
  .post(menuController.createMenuItem);

menuRouter
  .route("/:id")
  .get(menuController.getSingleMenuItem)
  .put(menuController.putMenuItem)
  .delete(menuController.deleteMenuItem);

module.exports = menuRouter;
