// * Utils
const asyncHandler = require("../middleware/async");
const validationSchema = require("../validationSchemas/Post");

// * NPM Packages

// * Models
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { connect } = require("mongoose");

// @desc     Add a post
// @route    POST /api/user/add-post
// @access   Private

exports.addPost = asyncHandler(async (req, res, next) => {
  try {
    let body = { ...req.body, photo: req.file.filename };
    const { value, error } = validationSchema.addPost(body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const newValue = { ...value, postedBy: req.user._id };
    const post = await Post.create(newValue);

    if (post && post.taggedUsers.length > 10) {
      return res.status(400).json({
        success: false,
        message: "You cannot tag more than 10 people in a post",
      });
    }

    // Only executing this block if taggedUsers are there
    if (post && post.taggedUsers.length > 0) {
      // Add post to each tagged users model
      //TODO Search for a better approach
      for (let item of post.taggedUsers) {
        let taggedUser = await User.findByIdAndUpdate(item, {
          $push: { taggedPosts: post },
        });
      }
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// @desc     Get a post by id
// @route    GET /api/user/post/:id
// @access   Private

exports.getPostById = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("taggedUsers postedBy comments")
      .exec();
    if (!post) {
      return res
        .status(400)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// @desc     Add a comment to a post
// @route    POST /api/user/post-comment/:id
// @access   Private

exports.addComment = asyncHandler(async (req, res, next) => {
  try {
    const { value, error } = validationSchema.addComment(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    let post = await Post.findById(req.params.id).exec();
    if (!post) {
      return res.status(400).json({
        success: false,
        message: `Post with the id of ${req.params.id} doesn't exist`,
      });
    }
    let newValue = { ...value, postedBy: req.user._id, post: post._id };
    const comment = await Comment.create(newValue);
    post = await Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment._id },
    });

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// @desc     Like a comment
// @route    POST /api/user/like-comment/:id
// @access   Private

exports.likeComment = asyncHandler(async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: `Comment with the id of ${req.params.id} doesn't exist`,
      });
    }
    // Check if the user has already liked the comment
    if (comment.likes && comment.likes.includes(req.user._id) === true) {
      return res
        .status(400)
        .json({ success: false, message: "Already liked the comment" });
    }
    comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: req.user._id },
      },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// @desc     Like a post
// @route    POST /api/user/like-post/:id
// @access   Private

exports.likePost = asyncHandler(async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: `Post with the id of ${req.params.id} doesn't exist`,
      });
    }
    // Check if the user has already liked the post
    if (post.likes && post.likes.includes(req.user._id) === true) {
      return res
        .status(400)
        .json({ success: false, message: "Already liked the post" });
    }
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: req.user._id },
      },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});

// @desc     Unlike a post
// @route    POST /api/user/unlike-post/:id
// @access   Private

exports.unlikePost = asyncHandler(async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: `Post with the id of ${req.params.id} doesn't exist`,
      });
    }
    // Check if the user has liked the post in the first place
    if (post.likes && post.likes.includes(req.user._id) === false) {
      return res
        .status(400)
        .json({ success: false, message: "You have to like the post first." });
    }
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      data: err,
    });
  }
});