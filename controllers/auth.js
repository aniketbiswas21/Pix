// * Utils
const asyncHandler = require("../middleware/async");
const validationSchema = require("../validationSchemas/User");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("../config/cloudinary-config");

// * NPM Packages
const otpGenerator = require("otp-generator");

// * Models
const User = require("../models/User");

// @desc     Register User
// @route    POST /api/auth/register
// @access   Public
exports.register = asyncHandler(async (req, res, next) => {
  try {
    const { value, error } = validationSchema.registerUser(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    console.log(otp);
    const newValue = { ...value, otp: { code: otp } };

    // Create user
    const user = await User.create(newValue);
    const message = `Wowee! Thanks for registering an account with Pix! Before you enter the land of awesomeness, We will need to verify your email. You can do so by entering ${user.otp.code}. This code is valid for only 15 minutes.`;
    await sendEmail({
      email: user.email,
      subject: "Verification OTP",
      message,
    });
    sendTokenResponse(user, 200, req, res);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      err,
    });
  }
});

// @desc     Login User
// @route    POST /api/auth/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
  try {
    const { value, error } = validationSchema.loginUser(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    const { email, password } = value;

    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    sendTokenResponse(user, 200, req, res);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      err,
    });
  }
});

// @desc     Verify Otp
// @route    POST /api/auth/verify-otp
// @access   Private
exports.verifyOtp = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).exec();
    const { value, error } = validationSchema.verifyOtp(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    const { otp } = value;

    if (user.verified === true) {
      return res
        .status(400)
        .json({ success: false, message: "Already Verified" });
    }

    // Check if otp matches
    const isMatch = await user.matchOtp(otp);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Otp Entered" });
    }

    const currentTime = new Date(Date.now()).toISOString();
    if (user.otp.validity < currentTime) {
      return res
        .status(400)
        .json({ success: false, message: "Otp has expired" });
    }

    user.verified = true;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json({ success: true, message: "Sucessfully Verified" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      err,
    });
  }
});

// @desc     Regenerate Otp
// @route    PUT /api/auth/regenerate-otp
// @access   Private
exports.regenerateOtp = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).exec();
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    // if user is already verified
    if (user.verified === true) {
      return res
        .status(400)
        .json({ success: false, message: "User already verified" });
    }
    user.otp.code = undefined;
    user.otp.validity = undefined;
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    console.log(otp);
    const validity = new Date(Date.now() + 15 * 60 * 1000);
    user.otp.code = otp;
    user.otp.validity = validity;
    await user.save({ validateBeforeSave: false });
    const message = `Wowee! Thanks for registering an account with Pix! Before you enter the land of awesomeness, We will need to verify your email. You can do so by entering ${user.otp.code}. This code is valid for only 15 minutes.`;
    await sendEmail({
      email: user.email,
      subject: "Verification OTP",
      message,
    });
    return res
      .status(200)
      .json({ success: true, message: "Sucessfully Regenerated OTP" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      err,
    });
  }
});

// @desc     Update Profile Pic
// @route    PUT /api/auth/update-profile-pic
// @access   Private
exports.updateProfilePic = asyncHandler(async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id).exec();
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    //check if there is a file
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a file" });
    }

    // const result = await cloudinary.uploader.upload(req.file.path);
    const { value, error } = validationSchema.updateProfilePic({
      photo: req.file.url,
    });
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    user = await User.findByIdAndUpdate(req.user._id, {
      photo: value.photo,
    });
    return res
      .status(200)
      .json({ success: true, message: "Sucessfully updated profile pic" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      err,
    });
  }
});

// @desc     Get current logged in user
// @route    GET /api/auth/me
// @access   Private

exports.getMe = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.user);
    // const user = await User.findById(req.user.id).populate(
    //   "followers following posts stories"
    // );
    const user = await User.findById(req.user.id).select(
      "name photo isGoogleUser email verified"
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        data: "No user found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, data: err });
  }
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, req, res) => {
  // Create token
  const token = user.getSignedJwtToken();
  req.session.token = token;
  const { name, photo, isGoogleUser, email, _id, verified } = user;
  const userData = { name, photo, isGoogleUser, email, _id, verified, id: _id };
  res.status(statusCode).json({ success: true, token, data: userData });
};
