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
