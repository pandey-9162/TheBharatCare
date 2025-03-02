const mongoose = require('mongoose');

let bookCounter = 0;

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  author: { type: String, required: true, trim: true },
  bookImgUrl: { type: String, required: true },
  bookDes: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  category: { type: String, required: true, trim: true },
  bookId: {
    type: String,
    unique: true,
    default: function () {
      bookCounter++;
      return `B-${String(bookCounter).padStart(4, '0')}`;
    }
  }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };
