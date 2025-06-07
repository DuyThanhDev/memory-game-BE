import express from 'express';
import { 
  saveScore, 
  getUserScores, 
  getTopScores, 
  deleteScore 
} from '../controllers/scoreController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Score:
 *       type: object
 *       required:
 *         - userId
 *         - level
 *         - score
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         userId:
 *           type: string
 *           description: Reference to user
 *         level:
 *           type: number
 *           description: Game level
 *         score:
 *           type: number
 *           description: Score achieved
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: When the score was recorded
 */

/**
 * @swagger
 * /api/scores:
 *   get:
 *     summary: Get user's scores
 *     tags: [Scores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's scores
 *       401:
 *         description: Not authenticated
 *   post:
 *     summary: Save a new score
 *     tags: [Scores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - level
 *               - score
 *             properties:
 *               level:
 *                 type: number
 *               score:
 *                 type: number
 *     responses:
 *       201:
 *         description: Score saved successfully
 *       401:
 *         description: Not authenticated
 */
router.route('/')
  .get(protect, getUserScores)
  .post(protect, saveScore);

/**
 * @swagger
 * /api/scores/top/{level}:
 *   get:
 *     summary: Get top scores for a level
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: level
 *         schema:
 *           type: string
 *         required: true
 *         description: Game level (EASY, MEDIUM, HARD)
 *     responses:
 *       200:
 *         description: List of top scores
 */
router.get('/top/:level', getTopScores);

/**
 * @swagger
 * /api/scores/{id}:
 *   delete:
 *     summary: Delete a score (admin only)
 *     tags: [Scores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Score ID
 *     responses:
 *       200:
 *         description: Score removed
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Score not found
 */
router.delete('/:id', protect, admin, deleteScore);

export default router;