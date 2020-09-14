// * Utils
const asyncHandler = require("../middleware/async");

// * NPM Packages

// * Models
const User = require("../models/User");

// @desc     Follow a user
// @route    POST /api/user/follow/:id
// @access   Private

exports.followById = asyncHandler(async (req, res, next) => {
  try {
    //Check if the user to be followed exists
    const userToFollow = await User.findById(req.params.id).exec();
    if (!userToFollow) {
      return res.status(400).json({
        success: false,
        message: `User with id of ${req.params.id} doesn't exist`,
      });
    }
    //Check if you are already following that user
    if (userToFollow.followers.includes(req.user.id) === true) {
      return res.status(400).json({
        success: false,
        message: `Already following User with id of ${req.params.id}`,
      });
    }
    userToFollow.followers.push(req.user.id);
    await userToFollow.save({ validateBeforeSave: false });

    // Update your following list
    const user = await User.findByIdAndUpdate(req.user.id, {
      $push: { following: userToFollow._id },
    });

    res.status(200).json({
      success: true,
      data: `Succesfully Followed user with the id of ${userToFollow._id}`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});
