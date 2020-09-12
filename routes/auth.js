const express = require("express");

// * NPM packages

// * Models

// * Controllers
const { register, login } = require("../controllers/auth");
const { verifyOtp } = require("../validationSchemas/User");

// * Middleware

// * API Endpoints -->
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);

module.exports = router;
