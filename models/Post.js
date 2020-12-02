const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("./User");

const PostSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: [true, "Please upload a Photo"],
    },
    caption: {
      type: String,
      default: null,
      maxlength: 1000,
    },
    taggedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postedOn: {
      type: Date,
      default: new Date(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "post",
});

PostSchema.virtual("totalLikes", {
  ref: "Like",
  localField: "_id",
  foreignField: "post",
  count: true,
});

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
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
