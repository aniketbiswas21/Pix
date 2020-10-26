const express = require("express");
const path = require("path");

// * NPM packages

// * Models

// * Controllers
const { addConversation, getConversation } = require("../controllers/chat");

// * Middleware
const { protect, verifiedUser } = require("../middleware/auth");

// * API Endpoints -->
const router = express.Router();

router.post("/add-conversation/:id", [protect, verifiedUser], addConversation);
router.get("/my-conversations", [protect, verifiedUser], getConversation);

module.exports = router;
