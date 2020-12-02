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
    const user = await User.findById(req.params.id).lean();
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
      // Check if the user is trying to start a conversation with himself
      if (user._id.equals(req.user._id)) {
        return res.status(400).json({
          success: false,
          message: "You cannot talk with yourself. Or, Can you?",
        });
      }
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
    }).lean();

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

// @desc     Get a Conversation by ID
// @route    GET /api/chat/conversation/:id
// @access   Private

exports.getConversationById = asyncHandler(async (req, res, next) => {
  try {
    // TODO Can be optimised
    const conversation = await Conversation.findById(req.params.id)
      .populate({ path: "messages" })
      .populate({ path: "participant1", select: "name photo email" })
      .populate({ path: "participant2", select: "name photo email" })
      .exec();

    if (!conversation) {
      return res.status(400).json({
        success: false,
        data: "No conversation found",
      });
    }
    // Check if the user accessing the conversation is a part of the same
    if (
      !conversation.participant1._id.equals(req.user.id) &&
      !conversation.participant2._id.equals(req.user.id)
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorised to view this" });
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
