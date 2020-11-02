const express = require("express");
const path = require("path");

// * NPM packages
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");

// * Models

// * Controllers
const {
  register,
  login,
  getMe,
  regenerateOtp,
  updateProfilePic,
} = require("../controllers/auth");
const { verifyOtp } = require("../controllers/auth");

// * Middleware
const { protect, verifiedUser } = require("../middleware/auth");

// * Multer Config
const storage = multer.diskStorage({});

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

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", protect, verifyOtp);
router.get("/me", protect, getMe);
router.put("/regenerate-otp", protect, regenerateOtp);
router.put(
  "/update-profile-pic",
  [protect, verifiedUser, upload],
  updateProfilePic
);

// auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback for google auth
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:3000/");
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  // req.logout();
  req.session = null;
  // res.redirect("http://localhost:3000/");
  res.json({ success: true, message: "Logged out successfully" });
});

module.exports = router;
