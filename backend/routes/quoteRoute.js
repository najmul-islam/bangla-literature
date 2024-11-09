const express = require("express");
const router = express.Router();
const { isApikey } = require("../middlewares/apikeyMiddleware");
const { isModerator } = require("../middlewares/userMiddleware");
const {
  getAllQuote,
  getRandomQuote,
  getSingleQuote,
  postQuote,
  putQuote,
  deleteQuote,
} = require("../controllers/quoteController");

router.get("/", isApikey, getAllQuote);
router.get("/random", isApikey, getRandomQuote);
router.get("/:quoteId", isApikey, getSingleQuote);

router.post("/", isModerator, postQuote);
router.put("/:quoteId", isModerator, putQuote);
router.delete("/:quoteId", isModerator, deleteQuote);

module.exports = router;
