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
    default: Date.now(),
  },
  expiresOn: {
    type: Date,
    default: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
});

StorySchema.index({ postedOn: 1 }, { expireAfterSeconds: 60 });

module.exports = mongoose.model("Story", StorySchema);
