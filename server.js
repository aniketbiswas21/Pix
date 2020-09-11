// * NPM Packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const cors = require("cors");

// * Config
const connectDB = require("./config/db");

// * Routes

const app = express();

//* Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//add routes

// * Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on Port ${PORT}`));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
