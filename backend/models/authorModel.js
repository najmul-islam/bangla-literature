const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  born: {
    type: String,
    trim: true,
  },
  died: {
    type: String,
    trim: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = mongoose.model("Author", authorSchema);
