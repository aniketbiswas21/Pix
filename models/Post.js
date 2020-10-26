const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("./User");

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

// Delete corresponding photo to post that will be deleted
PostSchema.post("remove", async (post, next) => {
  await fs.unlink(
    path.resolve(
      __dirname,
      `../client/public/uploads/user_posts/${post.photo}`
    ),
    (err) => console.log(err)
  );
  await User.updateMany(
    { taggedPosts: post._id },
    { $pull: { taggedPosts: post._id } }
  );
  next();
});

module.exports = mongoose.model("Post", PostSchema);
