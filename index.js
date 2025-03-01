import express from 'express';
import dotenv from 'dotenv';
import { connectDB, closeDB } from './config/db.js';
import locationRoutes from './routes/locationRoutes.js';
import paymentRoutes from './routes/payment.js';
dotenv.config();
connectDB();

const app = express();
app.use(express.json()); 

app.use('/api/location', locationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/register', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Clean Bharat');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
