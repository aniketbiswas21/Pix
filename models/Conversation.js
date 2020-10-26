const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const ConversationSchema = new mongoose.Schema({
  participant1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participant2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  lastOpened: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Conversation", ConversationSchema);
