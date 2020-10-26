const express = require("express");
const path = require("path");

// * NPM packages
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// * Models

// * Controllers
const {
  followById,
  unfollowById,
  getTimeline,
  explorePosts,
  myPosts,
} = require("../controllers/user");
const {
  addPost,
  getPostById,
  addComment,
  likeComment,
  likePost,
  unlikePost,
  unlikeComment,
  deletePost,
} = require("../controllers/post");
const {
  addStory,
  viewStory,
  exploreStory,
  myStory,
  deleteStory,
} = require("../controllers/story");

// * Middleware
const { protect, verifiedUser } = require("../middleware/auth");

// * Multer Config
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../client/public/uploads/user_posts"),
  filename: function (req, file, callback) {
    callback(null, "Post_" + uuidv4() + path.extname(file.originalname));
  },
});

// Storage config for stories
const storyStorage = multer.diskStorage({
  destination: path.resolve(__dirname, "../client/public/uploads/user_story"),
  filename: function (req, file, callback) {
    callback(null, "Story_" + uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("photo");

const uploadStory = multer({
  storage: storyStorage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("photo");

function checkFileType(file, cb) {
  // Make sure that the image is a photo
  if (!file.mimetype.startsWith("image")) {
    // return next(new ErrorResponse(`Please upload an image file`, 400));
    return cb("Error: Invalid file type.");
  }
  //Make sure the image is less than 4mb
  else if (file.size > 4000000) {
    return cb("Error: Invalid file size.");
  } else {
    return cb(null, true);
  }
}

// * API Endpoints -->
const router = express.Router();

router.post("/follow/:id", [protect, verifiedUser], followById);
router.post("/unfollow/:id", [protect, verifiedUser], unfollowById);
router.post("/add-post", [protect, verifiedUser, upload], addPost);
router.get("/timeline", [protect, verifiedUser], getTimeline);
router.get("/explore-posts", explorePosts);
router.get("/post/:id", [protect, verifiedUser], getPostById);
router.post("/post-comment/:id", [protect, verifiedUser], addComment);
router.post("/like-comment/:id", [protect, verifiedUser], likeComment);
router.post("/unlike-comment/:id", [protect, verifiedUser], unlikeComment);
router.post("/like-post/:id", [protect, verifiedUser], likePost);
router.post("/unlike-post/:id", [protect, verifiedUser], unlikePost);
router.get("/my-posts", [protect, verifiedUser], myPosts);
router.post("/add-story", [protect, verifiedUser, uploadStory], addStory);
router.get("/view-story/:id", [protect, verifiedUser], viewStory);
router.get("/story-timeline", [protect, verifiedUser], exploreStory);
router.get("/my-stories", [protect, verifiedUser], myStory);
router.delete("/delete-story/:id", [protect, verifiedUser], deleteStory);
router.delete("/delete-post/:id", [protect, verifiedUser], deletePost);

module.exports = router;
