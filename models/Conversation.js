const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    participant1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participant2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastOpened: {
      type: Date,
      default: new Date(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ConversationSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "conversationId",
});

module.exports = mongoose.model("Conversation", ConversationSchema);
