const express = require("express");

// * NPM packages

// * Models

// * Controllers
const { register } = require("../controllers/auth");

// * Middleware

// * API Endpoints -->
const router = express.Router();

router.post("/register", register);

module.exports = router;
