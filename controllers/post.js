const Post = require("../models/Post.js");
const Counter = require("../models/Counter.js");
const User = require("../models/User.js");

exports.ServerHome = async (req, res) => {
  try {
    res.status(200).send(" Welcome to Server at Node.js ");
  } catch (error) {
    console.log(error);
  }
};

exports.getAllposts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ postNumber: -1 }).populate({
      path: "writer",
      select: "username",
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, userId, createdAt, imageUrl } = req.body;
    const postCount = await Counter.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true }
    );
    const postNumber = postCount.count;
    const findUser = await User.findOne({ _id: userId }).exec();
    const post = new Post({
      content,
      writer: findUser._id,
      createdAt,
      postNumber,
      imageUrl,
    });
    await post.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
