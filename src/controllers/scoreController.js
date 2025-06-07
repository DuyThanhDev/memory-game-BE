import asyncHandler from 'express-async-handler';
import Score from '../models/Score.js';

// @desc    Save a new score
// @route   POST /api/scores
// @access  Private
const saveScore = asyncHandler(async (req, res) => {
  const { level, score } = req.body;
  
  const newScore = await Score.create({
    userId: req.user._id,
    level,
    score,
  });

  res.status(201).json(newScore);
});

// @desc    Get user's scores
// @route   GET /api/scores
// @access  Private
const getUserScores = asyncHandler(async (req, res) => {
  const scores = await Score.find({ userId: req.user._id }).sort({ timestamp: -1 });
  res.json(scores);
});

// @desc    Get top scores for a level
// @route   GET /api/scores/top/:level
// @access  Public
const getTopScores = asyncHandler(async (req, res) => {
  try {
    const { level } = req.params;
    console.log('Fetching top scores for level:', level);
    
    // Tìm kiếm bằng chuỗi level thay vì chuyển đổi thành số
    const scores = await Score.find({ level })
      .sort({ score: -1 })
      .limit(10);
    
    console.log('Found scores:', scores);
    
    // Trả về dữ liệu đơn giản không có populate
    res.json(scores);
  } catch (error) {
    console.error('Error fetching top scores:', error);
    res.status(500).json({ message: 'Error fetching top scores', error: error.message });
  }
});

// @desc    Delete a score (admin only)
// @route   DELETE /api/scores/:id
// @access  Private/Admin
const deleteScore = asyncHandler(async (req, res) => {
  const score = await Score.findById(req.params.id);

  if (score) {
    await score.deleteOne();
    res.json({ message: 'Score removed' });
  } else {
    res.status(404);
    throw new Error('Score not found');
  }
});

export { saveScore, getUserScores, getTopScores, deleteScore };