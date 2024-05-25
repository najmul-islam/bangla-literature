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
const { isUser, isModerator } = require("../middlewares/authMiddleware");
const { isApikey } = require("../middlewares/apikeyMiddleware");

router.get("/", isUser, isApikey, getAllAuthor);
router.get("/:id", isUser, isApikey, getSingleAuthor);
router.post("/", isUser, isModerator, isApikey, avatarUpload, postAuthor);
router.put("/:id", isUser, isModerator, isApikey, avatarUpload, putAuthor);
router.delete("/:id", isUser, isModerator, isApikey, deleteAuthor);

module.exports = router;
