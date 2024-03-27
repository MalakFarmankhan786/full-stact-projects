// app.js
const path = require("path")
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");


const authRoutes = require("./routes/auth");

const app = express();

// const DIR = path.join(__dirname, 'images');
const filteStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
    },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString()+"-"+file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: filteStorage, fileFilter: fileFilter }).single("image")
);

// Middleware
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/default", express.static(path.join(__dirname, "default")));

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
    const PORT = 8080;
    app.listen(PORT);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
