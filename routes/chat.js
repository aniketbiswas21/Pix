const express = require("express");
const path = require("path");

// * NPM packages

// * Models

// * Controllers
const {
  addConversation,
  getConversation,
  getConversationById,
} = require("../controllers/chat");

// * Middleware
const { protect, verifiedUser } = require("../middleware/auth");

// * API Endpoints -->
const router = express.Router();

router.post("/add-conversation/:id", [protect, verifiedUser], addConversation);
router.get("/my-conversations", [protect, verifiedUser], getConversation);
router.get("/conversation/:id", [protect, verifiedUser], getConversationById);

module.exports = router;
