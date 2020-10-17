const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Please add a comment"],
    maxlength: 1000,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postedOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
