const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const StorySchema = new mongoose.Schema({
  photo: {
    type: String,
    required: [true, "Please upload a Photo"],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postedOn: {
    type: Date,
    default: new Date(),
  },
  expiresOn: {
    type: Date,
    default: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
});

module.exports = mongoose.model("Story", StorySchema);
