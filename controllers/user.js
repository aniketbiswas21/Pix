// * Utils
const asyncHandler = require("../middleware/async");

// * NPM Packages
const { remove } = require("lodash");

// * Models
const User = require("../models/User");

// @desc     Follow a user
// @route    POST /api/user/follow/:id
// @access   Private

exports.followById = asyncHandler(async (req, res, next) => {
  try {
    //TODO Logic if a user has a private account
    //Check if the user to be followed exists
    const userToFollow = await User.findById(req.params.id).exec();
    if (!userToFollow) {
      return res.status(400).json({
        success: false,
        message: `User with id of ${req.params.id} doesn't exist`,
      });
    }
    //Check if the person is trying to follow himself
    if (userToFollow._id.equals(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "I know you are lonely bro. But, seriously, get a life lmao",
      });
    }
    //Check if you are already following that user
    if (userToFollow.followers.includes(req.user._id) === true) {
      return res.status(400).json({
        success: false,
        message: `Already following User with id of ${req.params.id}`,
      });
    }
    userToFollow.followers.push(req.user.id);
    await userToFollow.save({ validateBeforeSave: false });

    // Update your following list
    const user = await User.findByIdAndUpdate(req.user._id, {
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

// @desc     Unfollow a user
// @route    POST /api/user/unfollow/:id
// @access   Private

exports.unfollowById = asyncHandler(async (req, res, next) => {
  try {
    //Check if the user to be unfollowed exists
    let userToUnfollow = await User.findById(req.params.id).exec();
    if (!userToUnfollow) {
      return res.status(400).json({
        success: false,
        message: `User with id of ${req.params.id} doesn't exist`,
      });
    }

    //Check if you are already following that user
    if (userToUnfollow.followers.includes(req.user._id) === false) {
      return res.status(400).json({
        success: false,
        message: `Not following User with id of ${req.params.id}`,
      });
    }
    // remove(userToUnfollow.followers, function (item) {
    //   return item.equals(req.user._id);
    // });
    // await userToUnfollow.save({ validateBeforeSave: false });
    userToUnfollow = await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.user._id },
    });

    // Update your following list
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { following: userToUnfollow._id },
    });

    res.status(200).json({
      success: true,
      data: `Succesfully unFollowed user with the id of ${userToUnfollow._id}`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});