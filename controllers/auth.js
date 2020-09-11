// * Utils
const asyncHandler = require("../middleware/async");
const validationSchema = require("../validationSchemas/User");

// * NPM Packages

// * Models
const User = require("../models/User");

// @desc     Register User
// @route    POST /api/auth/register
// @access   Public
exports.register = asyncHandler(async (req, res, next) => {
  try {
    const { value, error } = validationSchema.registerUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create user
    const user = await User.create(value);

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      err,
    });
  }
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
