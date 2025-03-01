import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    amount: {
      type: Number,
      required: true,
      min: [1, 'Donation amount must be at least 1'],
    },
    message: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
