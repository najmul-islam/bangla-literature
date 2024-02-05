const asyncHandler = require("express-async-handler");

const isApikey = asyncHandler(async (req, res, next) => {
  let apikey;
  if (req.headers["x-api-key"]) {
    apikey = req.headers["x-api-key"];
    req.apikey = apikey;
    next();
  } else {
    return res
      .status(401)
      .json({ message: "APi key is missing in your header" });
  }
});

module.exports = { isApikey };
