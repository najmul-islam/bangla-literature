const express = require("express");
const router = express.Router();
const {
  register,
  login,
  profile,
  verifyEmail,
  resendVerifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/userController");
const { isSubscriber } = require("../middlewares/userMiddleware");

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/resend-verify-email", resendVerifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/login", login);
router.get("/profile", isSubscriber, profile);
router.post("/change-password", isSubscriber, changePassword);

module.exports = router;
