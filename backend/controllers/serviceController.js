const asyncHandler = require("express-async-handler");
const Service = require("../models/serviceModel");

const getAllService = asyncHandler(async (req, res) => {
  const services = await Service.find({}).sort({ name: 1 });

  res.status(200).json(services);
});

const getSingleService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  if (!service) {
    res.status(404);
    throw new Error("Author not found with this id");
  }

  res.status(200).json(service);
});

const postService = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please provide the API title");
  }

  const newService = await Service.create(req.body);

  res.status(201).json(newService);
});

const putService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    version,
    endpoint,
    method,
    parameters,
    headers,
    javascript_ex,
    python_ex,
  } = req.body;

  const service = await Service.findById(id);
  if (!service) {
    res.status(400);
    throw new Error("Service not found");
  }

  const updatedService = await Service.findByIdAndUpdate(
    id,
    {
      title,
      description,
      version,
      endpoint,
      method,
      parameters,
      headers,
      javascript_ex,
      python_ex,
    },
    { new: true }
  );

  res.status(200).json(updatedService);
});

const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id);
  if (!service) {
    res.status(400);
    throw new Error("API not found");
  }

  await Service.findByIdAndDelete(id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllService,
  getSingleService,
  postService,
  putService,
  deleteService,
};
