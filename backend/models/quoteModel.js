const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
      unique: true,
    },

    author: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "progress", "published"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
