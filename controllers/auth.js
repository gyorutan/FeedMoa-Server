const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.verifyLoginId = async (req, res) => {
  try {
    const loginId = req.body.loginId;
    if(!loginId) {
      return res.status(400).json({ success: false, cause: "null" });
    }
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/;
    const isValid = pattern.test(loginId);
    if(!isValid) {
      return res.status(400).json({ success: false, cause: "pattern" });
    }
    const loginIdExists = await User.exists({ loginId }).exec();
    if (loginIdExists) {
      return res.status(409).json({ success: false, cause: "exists" });
    } else {
      return res.status(409).json({ success: true, loginId: loginId });
    }
  } catch (error) {
    console.log(error);
  };
};

exports.verifyUsername = async (req, res) => {
  try {
    const username = req.body.username;
    if(!username) {
      return res.status(400).json({ success: false, cause: "null" });
    }
    const pattern = /^([a-zA-Z0-9가-힣]{3,7})$/;
    const isValid = pattern.test(username);
    if(!isValid) {
      return res.status(400).json({ success: false, cause: "pattern" });
    }
    const usernameExists = await User.exists({ username }).exec();
    if (usernameExists) {
      return res.status(409).json({ success: false, cause: "exists" });
    } else {
      return res.status(409).json({ success: true, username: username });
    }
  } catch (error) {
    console.log(error);
  };
};

exports.Login = async (req, res) => {
  try {
    const { loginId, loginPw } = req.body;
    const user = await User.findOne({ loginId }).exec();
    if (!user) {
      return res.status(401).json({
        success: false,
      });
    }
    const match = await bcrypt.compare(loginPw, user.loginPw);
    if (!match) {
      return res.status(401).json({
        success: false,
      });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7h",
      }
    );
    return res
      .status(200)
      .json({ success: true, username: user.username, token });
  } catch (error) {
    console.log(error);
  };
};

exports.Register = async (req, res) => {
  try {
    const { username, loginId, loginPw, createdAt } = req.body;
    const hashedPassword = await bcrypt.hash(loginPw, 10);
    await User.create({
      username,
      loginId,
      loginPw : hashedPassword,
      createdAt,
    });
    return res.status(200).json({ success : true });
  } catch (error) {
    console.log(error);
  };
};
