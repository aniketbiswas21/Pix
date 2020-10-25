// * Utils
const asyncHandler = require("../middleware/async");
const validationSchema = require("../validationSchemas/Story");

// * NPM Packages

// * Models
const User = require("../models/User");
const Story = require("../models/Story");
const Comment = require("../models/Comment");
const { connect } = require("mongoose");

// @desc     Add a story
// @route    POST /api/user/add-story
// @access   Private

exports.addStory = asyncHandler(async (req, res, next) => {
  try {
    let body = { ...req.body, photo: req.file.filename };
    const { value, error } = validationSchema.addStory(body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const newValue = { ...value, postedBy: req.user._id };
    const story = await Story.create(newValue);

    res.status(200).json({
      success: true,
      data: story,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// @desc     View a story
// @route    GET /api/user/view-story/:id
// @access   Private

exports.viewStory = asyncHandler(async (req, res, next) => {
  try {
    let story = await Story.findById(req.params.id);
    if (!story) {
      return res
        .status(400)
        .json({ success: false, message: "Story doesn't exist" });
    }
    // Add to stories viewer list if the viewer is unique and is not the owner
    if (
      story.viewers.includes(req.user.id) === false &&
      !story.postedBy.equals(req.user.id)
    ) {
      story = await Story.findByIdAndUpdate(
        req.params.id,
        {
          $push: { viewers: req.user.id },
        },
        {
          runValidators: false,
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      data: story,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// @desc     Get a user's story timeline
// @route    GET /api/user/story-timeline
// @access   Private

exports.exploreStory = asyncHandler(async (req, res, next) => {
  try {
    // The following list of the current user
    const followingList = req.user.following;
    let stories = await Story.find({
      postedBy: { $in: followingList },
    })
      .select("-viewers")
      .populate({ path: "postedBy", select: "name photo" });

    res.status(200).json({
      success: true,
      data: stories,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// @desc     Get a user's own stories
// @route    GET /api/user/my-stories
// @access   Private

exports.myStory = asyncHandler(async (req, res, next) => {
  try {
    const stories = await Story.find({
      postedBy: req.user.id,
    }).populate({ path: "postedBy", select: "name photo" });

    res.status(200).json({
      success: true,
      data: stories,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// @desc     Delete A Story
// @route    DELETE /api/user/delete-story/:id
// @access   Private

exports.deleteStory = asyncHandler(async (req, res, next) => {
  try {
    let story = await Story.findById(req.params.id);

    if (!story) {
      return res
        .status(400)
        .json({ success: false, message: "Story doesn't exist" });
    }
    // Check the person deleting is the owner of the story
    if (!story.postedBy.equals(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: "Not authorised to perform this action",
      });
    }

    await story.remove();

    res.status(200).json({
      success: true,
      data: "Successfully deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});
