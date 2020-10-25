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
// @route    POST /api/user/view-story/:id
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
