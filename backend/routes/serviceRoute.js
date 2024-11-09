const express = require("express");
const router = express.Router();
const { isModerator } = require("../middlewares/userMiddleware");
const {
  getAllService,
  getSingleService,
  postService,
  putService,
  deleteService,
} = require("../controllers/serviceController");

router.get("/", isModerator, getAllService);
router.get("/:id", isModerator, getSingleService);
router.post("/", isModerator, postService);
router.put("/:id", isModerator, putService);
router.delete("/:id", isModerator, deleteService);

module.exports = router;
