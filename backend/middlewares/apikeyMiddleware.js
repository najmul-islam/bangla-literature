const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const isApikey = asyncHandler(async (req, res, next) => {
  const apikey = req.headers["x-api-key"];
  const user = req.user;

  if (!apikey) {
    return res
      .status(401)
      .json({ message: "API key is missing in your headersss" });
  }

  const apiKeyUser = await User.findOne({ apikey });
  if (!apiKeyUser) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  if (apiKeyUser.email !== user.email) {
    return res.status(403).json({
      message: "Invalid API key",
    });
  }

  req.apikey = apikey;
  next();
});

module.exports = { isApikey };
