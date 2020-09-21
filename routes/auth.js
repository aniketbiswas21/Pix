const express = require("express");

// * NPM packages

// * Models

// * Controllers
const {
  register,
  login,
  getMe,
  regenerateOtp,
} = require("../controllers/auth");
const { verifyOtp } = require("../controllers/auth");

// * Middleware
const { protect } = require("../middleware/auth");

// * API Endpoints -->
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", protect, verifyOtp);
router.get("/me", protect, getMe);
router.put("/regenerate-otp", protect, regenerateOtp);

module.exports = router;
