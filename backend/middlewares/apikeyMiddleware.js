const asyncHandler = require("express-async-handler");

const isApikey = asyncHandler(async (req, res, next) => {
  let apikey;
  if (req.headers["X-Api-Key"]) {
    apikey = req.headers["X-Api-Key"];
    req.apikey = apikey;
    next();
  } else {
    return res
      .status(401)
      .json({ message: "API key is missing in your header" });
  }
});

module.exports = { isApikey };
