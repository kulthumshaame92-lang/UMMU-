import express from 'express';
import {
  getActiveDietPlan,
  getDietPlanById,
  swapMeal,
  createDietPlan
} from '../controllers/dietPlanController.js';
import { validateBody } from '../middleware/validator.js';

const router = express.Router();

router.get('/active', getActiveDietPlan);
router.get('/:id', getDietPlanById);
router.post('/swap-meal', validateBody(['mealId', 'newRecipeId']), swapMeal);
router.post('/', validateBody(['planTitle', 'targetCal']), createDietPlan);

export default router;
