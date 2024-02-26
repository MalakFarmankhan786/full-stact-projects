// app.js

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.use("/api",authRoutes);


app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  // res.status(status).json({ status: status, message: message });
  res.status(status).json({ detail: message });

});

// MongoDB connection
const DB_CONNECTION_STRING = 'mongodb://localhost:27017/node-app';
mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the Express server
    const PORT = 8000;
    app.listen(PORT);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
