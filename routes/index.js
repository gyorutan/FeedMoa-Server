const express = require("express");
const { ServerHome, createPost, getAllposts } = require("../controllers/post.js");
const { getImage } = require("../middleware/upload.js");
const {
  Login,
  Register,
  verifyLoginId,
  verifyUsername,
} = require("../controllers/auth.js");
const router = express.Router();

// ------------------------- GET ------------------------- //

// Server Home
router.get("/", ServerHome);

// Get Image
router.get("/image", getImage);

// Get Allposts
router.get("/getAllposts", getAllposts)

// ------------------------- POST ------------------------- //

// Login
router.post("/login", Login);

// Register
router.post("/register", Register);

// VerifyLoginId
router.post("/verifyLoginId", verifyLoginId);

// VerifyUsername
router.post("/verifyUsername", verifyUsername);

// Create Post
router.post("/createPost", createPost);

// ------------------------- PUT ------------------------- //

// ------------------------- DELETE ------------------------- //

module.exports = router;
