const express = require("express");
const router = express.Router();
const {
  getAllAuthor,
  getSingleAuthor,
  postAuthor,
  putAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const avatarUpload = require("../middlewares/avatarMiddleware");
const { isModerator } = require("../middlewares/userMiddleware");
const { isApikey } = require("../middlewares/apikeyMiddleware");

router.get("/", isApikey, getAllAuthor);
router.get("/:id", isApikey, getSingleAuthor);

router.post("/", isModerator, avatarUpload, postAuthor);
router.put("/:id", isModerator, avatarUpload, putAuthor);
router.delete("/:id", isModerator, deleteAuthor);

module.exports = router;
