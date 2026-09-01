import express from 'express';
import { logDailyProgress, getProgressHistory, getProgressSummary } from '../controllers/progressController.js';

const router = express.Router();

router.post('/log', logDailyProgress);
router.get('/history', getProgressHistory);
router.get('/summary', getProgressSummary);

export default router;
