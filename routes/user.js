const express = require("express");

// * NPM packages

// * Models

// * Controllers
const { followById } = require("../controllers/user");

// * Middleware
const { protect, verifiedUser } = require("../middleware/auth");

// * API Endpoints -->
const router = express.Router();

router.post("/follow/:id", [protect, verifiedUser], followById);

module.exports = router;
