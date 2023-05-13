const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  postNumber: {
    type: Number,
    ref: "Counter",
    required: true,
  },
  comments: [
    {
      comment: {
        type: String,
        require: true,
      },
      commentBy: {
        type: String,
        require: true,
      },
      commentAt: {
        type: String,
        require: true,
      },
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
