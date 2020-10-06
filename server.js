// * NPM Packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const passport = require("passport");

// * Config
const connectDB = require("./config/db");
const passportSetup = require("./config/passport-setup");

// * Routes
const auth = require("./routes/auth");
const user = require("./routes/user");

const app = express();

// * Middleware
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Cookie Parser
app.use(cookieParser());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
    // name: "token",
  })
);

//initiaise passport
app.use(passport.initialize());
app.use(passport.session());

//Dev loggin middleware
if (process.env.NODE_env === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// * Routes
app.use("/api/auth", auth);
app.use("/api/user", user);

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
