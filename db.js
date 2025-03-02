const mongoose=require('mongoose')
const dotenv = require('dotenv');

dotenv.config();
const mongoURI = process.env.MONGO_URL;

if (!mongoURI) {
  console.error('Error: MONGO_URI is not defined in .env');
  process.exit(1);
}

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(mongoURI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };
  const closeDB = async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };
  
  module.exports= connectDB;
  
