const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const PostSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: [true, "Please upload a Photo"],
  },
  caption: {
    type: String,
    default: null,
    maxlength: 1000,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  taggedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postedOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", PostSchema);
