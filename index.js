const express = require('express');
const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

const app = express();
app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => {
  res.send('good to Clean Bharat API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
