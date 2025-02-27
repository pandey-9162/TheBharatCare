const express = require('express');
const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

const app = express();
app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => {
  res.send('Welcome to the Clean Bharat');
});

app.get('/patment', (req, res) => {
  res.send('Welcome to the payment page');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

