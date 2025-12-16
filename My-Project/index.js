const express = require("express");
const menuRouter = require("./MenuRouter");

const app = express();

// Middleware
app.use(express.json());

// Request time middleware
app.use((req, res, next) => {
  console.log("New request received");
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api/v1/menu", menuRouter);

// Home route
app.get("/", (req, res) => {
  res.send("Hello! Welcome to the Menu API");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

module.exports = app;
