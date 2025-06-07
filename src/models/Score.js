import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    level: {
      type: String, // Sử dụng String thay vì Number để chấp nhận 'EASY', 'MEDIUM', 'HARD'
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Score = mongoose.model('Score', scoreSchema);

export default Score;