const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");

const getAllAuthor = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const authors = await Author.find({})
    .sort({ name: 1 })
    .skip(skip)
    .limit(limit);

  const total = await Author.countDocuments();
  const totalPage = Math.ceil(total / limit);

  res.status(200).json({
    total,
    page,
    limit,
    totalPage,
    authors,
  });
});

const getSingleAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const author = await Author.findById(id);

  if (!author) {
    res.status(404);
    throw new Error("Author not found with this id");
  }
  res.status(200).json(author);
});

const postAuthor = asyncHandler(async (req, res) => {
  const { name, bio, born, died, books } = req.body;
  const avatar = req.avatar;

  if (!name) {
    res.status(400);
    throw new Error("Please fill author name");
  }

  const newAuthor = await Author.create({
    name,
    bio,
    avatar,
    born,
    died,
    books: books ? books.split(",").map((book) => book.trim()) : [],
  });

  res.status(201).json(newAuthor);
});

const putAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, bio, born, died, books } = req.body;
  const avatar = req.avatar;

  const author = await Author.findById(id);
  if (!author) {
    res.status(400);
    throw new Error("Author not found");
  }

  const putedAuthor = await Author.findByIdAndUpdate(
    id,
    {
      name,
      bio,
      born,
      died,
      avatar,
      books: books ? books.split(",").map((book) => book.trim()) : [],
    },
    { new: true }
  );

  res.status(201).json(putedAuthor);
});

const deleteAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const author = await Author.findById(id);
  if (!author) {
    res.status(400);
    throw new Error("Author not found");
  }

  await Author.findByIdAndDelete(id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllAuthor,
  getSingleAuthor,
  postAuthor,
  putAuthor,
  deleteAuthor,
};
