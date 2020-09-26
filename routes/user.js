const express = require("express");
const path = require("path");

// * NPM packages
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// * Models

// * Controllers
const { followById, unfollowById } = require("../controllers/user");
const { addPost } = require("../controllers/user");

// * Middleware
const { protect, verifiedUser } = require("../middleware/auth");

// * Multer Config
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../client/public/uploads/user_posts"),
  filename: function (req, file, callback) {
    callback(null, "Post_" + uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
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

module.exports = router;
