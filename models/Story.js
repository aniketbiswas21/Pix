const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const StorySchema = new mongoose.Schema({
  photo: {
    type: String,
    required: [true, "Please upload a Photo"],
  },
  viewers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
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

StorySchema.index({ postedOn: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

// Delete corresponding photo to story that will be deleted
StorySchema.post("remove", async (story, next) => {
  fs.unlink(
    path.resolve(
      __dirname,
      `../client/public/uploads/user_story/${story.photo}`
    ),
    (err) => console.log(err)
  );
  next();
});

module.exports = mongoose.model("Story", StorySchema);
