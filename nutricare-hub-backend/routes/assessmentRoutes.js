import express from 'express';
import { submitAssessment, getLatestAssessment, getAssessmentHistory } from '../controllers/assessmentController.js';
import { validateBody } from '../middleware/validator.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Public / Guest or Authenticated submission
router.post(
  '/',
  validateBody(['age', 'heightCm', 'weightKg', 'primaryGoal']),
  submitAssessment
);

router.get('/latest', authenticateJWT, getLatestAssessment);
router.get('/history', authenticateJWT, getAssessmentHistory);

export default router;
