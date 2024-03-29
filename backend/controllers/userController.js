const asyncHandler = require("express-async-handler");
const sendVerificationEmail = require("../utils/sendEmail");
const sendTempPassword = require("../utils/sendTempPassword");
const User = require("../models/userModel");

// register user
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("A user is already associated with this email");
  }

  // if (!userExists.isVerified) {
  //   res.status(400);
  //   throw new Error("user not verified");
  // }

  // create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    sendVerificationEmail(user);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { emailToken } = req.query;

  if (!emailToken) {
    res.status(404);
    throw new Error("Email token not found...");
  }

  const user = await User.findOne({ emailToken });

  if (!user) {
    res.status(400);
    throw new Error("User not found with this email token");
  }

  user.emailToken = null;
  user.isVerified = true;
  await user.save();

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isVerified: user?.isVerified,
  });
});

const resendVerifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("This account has already been verified");
  }

  user.emailToken = user.generateEmailToken();
  await user.save();

  sendVerificationEmail(user);

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isVerified: user?.isVerified,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { tempPassword: user.generateTempPassword() },
    { new: true }
  );

  sendTempPassword(updatedUser);

  res.status(200).json({ message: "Temporary code sent successfully" });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, tempPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.tempPassword !== tempPassword) {
    res.status(400);
    throw new Error("Invalid temporary password");
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("password and confirm password not match");
  }

  user.password = newPassword;
  user.tempPassword = null;
  await user.save();

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isVerified: user?.isVerified,
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.isValidPassword(oldPassword)) {
    res.status(400);
    throw new Error("Invalid old password");
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("Password and confirm password not match");
  }

  user.password = newPassword;
  user.tempPassword = null;
  await user.save();

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isVerified: user?.isVerified,
  });
});

// login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user.isVerified) {
    res.status(400);
    throw new Error("This account has not been verified.");
  }

  if (user && (await user.isValidPassword(password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      apikey: user.apikey,
      token: user.generateToken(),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// profile
const profile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

module.exports = {
  register,
  verifyEmail,
  forgotPassword,
  resendVerifyEmail,
  changePassword,
  resetPassword,
  login,
  profile,
};
