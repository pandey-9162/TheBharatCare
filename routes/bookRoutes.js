const express = require('express');
const router = express.Router();
const { Book } = require('../models/bookModel.js'); 

const fetchBooks = async (query) => {
  const { category, bookName, author } = query;

  const filter = {};
  if (category) filter.category = category;
  if (bookName) filter.bookName = { $regex: bookName, $options: 'i' }; // Case-insensitive search
  if (author) filter.author = { $regex: author, $options: 'i' };

  try {
    return await Book.find(filter);
  } catch (error) {
    throw error;
  }
};

router.get('/', async (req, res) => {
  try {
    const books = await fetchBooks(req.query);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});
router.post('/', async (req, res) => {
    try {
      const { bookName, price, author, bookImgUrl, bookDes, rating, category } = req.body;
  
      // Auto-generate bookId like B-0001, B-0002, etc.
      const lastBook = await Book.findOne().sort({ createdAt: -1 });
      const lastId = lastBook ? parseInt(lastBook.bookId.split('-')[1]) : 0;
      const bookId = `B-${String(lastId + 1).padStart(4, '0')}`;
  
      const newBook = new Book({
        bookName,
        price,
        author,
        bookImgUrl,
        bookDes,
        rating,
        category,
        bookId
      });
  
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      res.status(500).json({ message: 'Error adding book', error: error.message });
    }
  });
  
module.exports = router;
