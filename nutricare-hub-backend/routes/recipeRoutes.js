import express from 'express';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  toggleFavorite,
  getFavorites
} from '../controllers/recipeController.js';
import { validateBody } from '../middleware/validator.js';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/favorites', getFavorites);
router.get('/:id', getRecipeById);
router.post('/', validateBody(['title', 'calories', 'description']), createRecipe);
router.post('/:id/favorite', toggleFavorite);

export default router;
