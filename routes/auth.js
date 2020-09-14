const express = require("express");

// * NPM packages

// * Models

// * Controllers
const { register, login } = require("../controllers/auth");
const { verifyOtp } = require("../controllers/auth");

// * Middleware
const { protect } = require("../middleware/auth");

// * API Endpoints -->
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", protect, verifyOtp);

module.exports = router;
