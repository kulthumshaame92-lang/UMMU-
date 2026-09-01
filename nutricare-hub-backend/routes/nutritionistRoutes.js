import express from 'express';
import {
  getAllNutritionists,
  getNutritionistById,
  addReview,
  getAvailableSlots
} from '../controllers/nutritionistController.js';
import { validateBody } from '../middleware/validator.js';

const router = express.Router();

router.get('/', getAllNutritionists);
router.get('/:id', getNutritionistById);
router.get('/:id/slots', getAvailableSlots);
router.post('/:id/reviews', validateBody(['rating', 'comment']), addReview);

export default router;
