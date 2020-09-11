const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Please upload a Photo"],
    maxlength: 1000,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
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
