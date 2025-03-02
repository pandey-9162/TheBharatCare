const mongoose = require('mongoose');
const { Book } = require('./models/bookModel.js'); // Adjust path as needed
const mongoDB=require("./db");
// mongoDB();

const books = [
  {
    bookName: "Concepts of Physics by H.C. Verma",
    price: 450,
    author: "H.C. Verma",
    bookImgUrl: "https://example.com/hcverma.jpg",
    bookDes: "A comprehensive guide for JEE aspirants to master physics concepts.",
    rating: 5,
    category: "JEE"
  },
  {
    bookName: "Mathematics for JEE Mains",
    price: 550,
    author: "R.D. Sharma",
    bookImgUrl: "https://example.com/rdsharma.jpg",
    bookDes: "Detailed explanations and problems for JEE Mains preparation.",
    rating: 4,
    category: "JEE"
  },
  {
    bookName: "Modern ABC of Chemistry for JEE",
    price: 600,
    author: "Dr. S.P. Jauhar",
    bookImgUrl: "https://example.com/abcchemistry.jpg",
    bookDes: "Covers organic, inorganic, and physical chemistry for JEE aspirants.",
    rating: 4.5,
    category: "JEE"
  },
  {
    bookName: "NEET Biology Volume 1",
    price: 500,
    author: "Trueman",
    bookImgUrl: "https://example.com/neetbio.jpg",
    bookDes: "Essential biology concepts and questions for NEET preparation.",
    rating: 4.8,
    category: "NEET"
  },
  {
    bookName: "Objective Physics for NEET",
    price: 520,
    author: "D.C. Pandey",
    bookImgUrl: "https://example.com/dcpandey.jpg",
    bookDes: "Physics questions and theory for NEET aspirants.",
    rating: 4.7,
    category: "NEET"
  },
  {
    bookName: "30 Years NEET Chemistry",
    price: 450,
    author: "MTG Editorial Board",
    bookImgUrl: "https://example.com/neetchem.jpg",
    bookDes: "Chapter-wise solutions of last 30 years NEET chemistry papers.",
    rating: 4.6,
    category: "NEET"
  },
  {
    bookName: "SSC General Studies",
    price: 400,
    author: "Rakesh Yadav",
    bookImgUrl: "https://example.com/sscgeneral.jpg",
    bookDes: "Comprehensive guide for SSC general studies preparation.",
    rating: 4.2,
    category: "SSC"
  },
  {
    bookName: "Quantitative Aptitude for SSC",
    price: 380,
    author: "R.S. Aggarwal",
    bookImgUrl: "https://example.com/rsaggarwal.jpg",
    bookDes: "Detailed explanation of quantitative aptitude concepts for SSC exams.",
    rating: 4.5,
    category: "SSC"
  },
  {
    bookName: "English for SSC Exams",
    price: 350,
    author: "S.P. Bakshi",
    bookImgUrl: "https://example.com/spbakshi.jpg",
    bookDes: "English grammar and vocabulary for SSC aspirants.",
    rating: 4,
    category: "SSC"
  },
  {
    bookName: "Indian Polity for UPSC",
    price: 600,
    author: "M. Laxmikanth",
    bookImgUrl: "https://example.com/laxmikanth.jpg",
    bookDes: "Covers the Indian Constitution and polity for UPSC preparation.",
    rating: 5,
    category: "UPSC"
  },
  {
    bookName: "History of Modern India",
    price: 580,
    author: "Bipan Chandra",
    bookImgUrl: "https://example.com/bipanchandra.jpg",
    bookDes: "An in-depth study of modern Indian history for UPSC aspirants.",
    rating: 4.8,
    category: "UPSC"
  },
  {
    bookName: "UPSC Economics",
    price: 550,
    author: "Ramesh Singh",
    bookImgUrl: "https://example.com/rameshsingh.jpg",
    bookDes: "Comprehensive guide to Indian economy for UPSC exams.",
    rating: 4.7,
    category: "UPSC"
  }
];

// Function to get the next `bookId`
const generateBookId = async () => {
    const lastBook = await Book.findOne().sort({ createdAt: -1 });
    const lastId = lastBook ? parseInt(lastBook.bookId.split('-')[1]) : 0;
    return `B-${String(lastId + 1).padStart(4, '0')}`;
  };

const seedBooks = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bookomega', {   
    });

    for (const book of books) {
        book.bookId = await generateBookId(); 
        await Book.create(book);
      }
      console.log('Books inserted successfully!');
      mongoose.disconnect();
    } 
   catch (error) {
    console.error('Error seeding books:', error);
    mongoose.disconnect();
  }
};

seedBooks();
