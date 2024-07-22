const express = require("express");
const jwt = require("jsonwebtoken");
const Book = require("../models/Book");

const router = express.Router();

const authenticate = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/borrowed", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const books = await Book.find({ borrowedBy: userId, isBorrowed: true });
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/add", authenticate, async (req, res) => {
  const { title, author, image } = req.body;
  try {
    const book = new Book({ title, author, image });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/edit/:id", authenticate, async (req, res) => {
  const { title, author,image } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author,image },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/borrow/:id", authenticate, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.isBorrowed)
      return res.status(400).json({ message: "Book already borrowed" });

    book.isBorrowed = true;
    book.borrowedBy = req.user.id;
    await book.save();
    res.status(404).json({ message: "Borrowed Successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.post("/return/:id", authenticate, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (
      !book.isBorrowed ||
      book.borrowedBy.toString() !== req.user.id.toString()
    ) {
      return res.status(400).json({ message: "Book not borrowed by you" });
    }

    book.isBorrowed = false;
    book.borrowedBy = null;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
