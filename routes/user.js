const express = require("express");

// * NPM packages

// * Models

// * Controllers
const { followById, unfollowById } = require("../controllers/user");

// * Middleware
const { protect, verifiedUser } = require("../middleware/auth");

// * API Endpoints -->
const router = express.Router();

router.post("/follow/:id", [protect, verifiedUser], followById);
router.post("/unfollow/:id", [protect, verifiedUser], unfollowById);

module.exports = router;
