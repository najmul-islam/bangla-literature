const asyncHandler = require("express-async-handler");
const Quote = require("../models/quoteModel");
const Author = require("../models/authorModel");
const Category = require("../models/categoryModel");

const getAllQuote = asyncHandler(async (req, res) => {
  const { author, category } = req.query;

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let queryQuotes = {
    status: "published",
  };

  if (author) {
    queryQuotes.author = author;
  }

  if (category) {
    queryQuotes.category = category;
  }

  const queryResult = await Quote.find(queryQuotes)
    .skip(skip)
    .limit(limit)
    .select("_id quote author category");

  const totalPage = Math.ceil(
    (await Quote.countDocuments(queryQuotes)) / limit
  );

  if (queryResult.length === 0) {
    return res.status(404).json({ message: "No quotes found" });
  }

  res.status(200).json({
    quotes: queryResult,
    pages: totalPage,
  });
});

const getRandomQuote = asyncHandler(async (req, res) => {
  const { author, category } = req.query;

  let queryQuotes = {
    status: "published",
  };

  if (author) {
    queryQuotes.author = author;
  }

  if (category) {
    queryQuotes.category = category;
  }

  const queryResult = await Quote.find(queryQuotes).select(
    "_id quote author category"
  );
  if (queryResult.length === 0) {
    return res.status(404).json({ message: "No quotes found" });
  }

  const randomIndex = Math.floor(Math.random() * queryResult.length);
  const randomQuote = queryResult[randomIndex];

  res.status(200).json(randomQuote);
});

const getSingleQuote = asyncHandler(async (req, res) => {
  const { quoteId } = req.params;

  const quote = await Quote.findById({ _id: quoteId });

  if (!quote) {
    res.status(4000);
    throw new Error("Qute not found");
  }

  res.status(200).json(quote);
});

const postQuote = asyncHandler(async (req, res) => {
  const { quote, author, category } = req.body;

  if (!quote && !author && category) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const isEndsWithFullstopMark = quote.trim().endsWith("।");
  const updatedQuoute = isEndsWithFullstopMark ? quote : `${quote}।`;

  const authorExist = await Author.findOne({ name: author.trim() });
  const categoryExist = await Category.findOne({ title: category.trim() });

  if (!authorExist) {
    await Author.create({
      name: author,
    });
  }

  if (!categoryExist) {
    await Category.create({
      title: category,
    });
  }

  const newQuote = await Quote.create({
    quote: updatedQuoute,
    author,
    category,
  });

  res.status(200).json(newQuote);
});

const putQuote = asyncHandler(async (req, res) => {
  const { quote, author, category, status } = req.body;
  const { quoteId } = req.params;

  const updatedQuoute = await Quote.findOneAndUpdate(
    { _id: quoteId },
    {
      quote,
      author,
      category,
      status,
    },
    {
      new: true,
    }
  );

  if (!updatedQuoute) {
    res.status(404);
    throw new Error("Quote not found");
  }

  res.status(200).json(updatedQuoute);
});

const deleteQuote = asyncHandler(async (req, res) => {
  const quote = await Quote.findByIdAndDelete(req.params.id);

  if (!quote) {
    res.status(400);
    throw new Error("Quote not found");
  }

  res.status(200).json(quote);
});

module.exports = {
  getAllQuote,
  getRandomQuote,
  getSingleQuote,
  postQuote,
  putQuote,
  deleteQuote,
};
