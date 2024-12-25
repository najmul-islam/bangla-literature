const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  endpoint: {
    type: String,
  },
  return: {
    type: String,
  },
  parameters: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
  headers: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
  sample_req: {
    type: String,
  },
  sample_res: {
    type: String,
  },
  javascript_eg: {
    type: String,
  },
  python_eg: {
    type: String,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
