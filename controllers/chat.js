// * Utils
const asyncHandler = require("../middleware/async");
const validationSchema = require("../validationSchemas/Story");

// * NPM Packages

// * Models
const User = require("../models/User");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// @desc     Create a conversation
// @route    POST /api/chat/add-conversation/:id
// @access   Private

exports.addConversation = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).exec();
    // Check if the id in parameter corresponds to an actual user in the database
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid User" });
    }
    const participants = [req.user.id, user._id];
    // Checking for the existing conversation between the current participants
    const conversation = await Conversation.find({
      participant1: { $in: participants },
      participant2: { $in: participants },
    })
      .populate({ path: "messages" })
      .exec();

    if (!conversation || conversation.length === 0) {
      let body = {
        participant1: req.user.id,
        participant2: user._id,
      };
      const newconversation = await (await Conversation.create(body)).populate({
        path: "messages",
      });
      return res.status(200).json({
        success: true,
        data: newconversation,
      });
    }

    res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// @desc     Get all User's Conversation
// @route    GET /api/chat/my-conversation
// @access   Private

exports.getConversation = asyncHandler(async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      $or: [{ participant1: req.user.id }, { participant2: req.user.id }],
    });

    res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});
