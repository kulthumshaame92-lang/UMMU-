import { db } from '../data/store.js';

export const getAllRecipes = (req, res, next) => {
  try {
    const { category, tag, search, maxCalories, minProtein } = req.query;
    let list = db.get('recipes');

    if (category && category !== 'All') {
      const catLower = category.toLowerCase();
      list = list.filter(r => r.category.toLowerCase() === catLower);
    }

    if (tag) {
      const tagLower = tag.toLowerCase();
      list = list.filter(r => r.tags.some(t => t.toLowerCase() === tagLower));
    }

    if (search) {
      const sLower = search.toLowerCase();
      list = list.filter(r =>
        r.title.toLowerCase().includes(sLower) ||
        r.description.toLowerCase().includes(sLower) ||
        r.ingredients.some(ing => ing.toLowerCase().includes(sLower))
      );
    }

    if (maxCalories) {
      const maxCal = Number(maxCalories);
      list = list.filter(r => r.calories <= maxCal);
    }

    if (minProtein) {
      const minProt = Number(minProtein);
      list = list.filter(r => Number(r.protein) >= minProt);
    }

    res.json({
      success: true,
      count: list.length,
      recipes: list
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipeById = (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = db.findById('recipes', id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe with ID '${id}' was not found.`
      });
    }

    res.json({
      success: true,
      recipe
    });
  } catch (error) {
    next(error);
  }
};

export const createRecipe = (req, res, next) => {
  try {
    const {
      title,
      category = 'High Protein',
      tags = [],
      calories,
      protein,
      carbs,
      fats,
      fiber = 5,
      prepTime = '20 mins',
      difficulty = 'Easy',
      image,
      description,
      ingredients = [],
      instructions = []
    } = req.body;

    const newRecipe = db.insert('recipes', {
      title,
      category,
      tags,
      calories: Number(calories),
      protein: typeof protein === 'number' ? `${protein}g` : protein,
      carbs: typeof carbs === 'number' ? `${carbs}g` : carbs,
      fats: typeof fats === 'number' ? `${fats}g` : fats,
      fiber: Number(fiber),
      prepTime,
      difficulty,
      rating: 5.0,
      reviews: 1,
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
      description,
      ingredients,
      instructions
    });

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully.',
      recipe: newRecipe
    });
  } catch (error) {
    next(error);
  }
};

export const toggleFavorite = (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : 'user-demo';

    const favorites = db.get('favorites');
    const existingIndex = favorites.findIndex(f => f.userId === userId && f.recipeId === id);

    let isFavorite = false;
    if (existingIndex > -1) {
      favorites.splice(existingIndex, 1);
      isFavorite = false;
    } else {
      favorites.push({ userId, recipeId: id, createdAt: new Date().toISOString() });
      isFavorite = true;
    }

    db.saveData();

    res.json({
      success: true,
      message: isFavorite ? 'Recipe added to favorites.' : 'Recipe removed from favorites.',
      isFavorite,
      recipeId: id
    });
  } catch (error) {
    next(error);
  }
};

export const getFavorites = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    const favorites = db.get('favorites').filter(f => f.userId === userId);
    const favoriteRecipeIds = favorites.map(f => f.recipeId);
    const allRecipes = db.get('recipes');
    const favoriteRecipes = allRecipes.filter(r => favoriteRecipeIds.includes(r.id));

    res.json({
      success: true,
      count: favoriteRecipes.length,
      favorites: favoriteRecipes
    });
  } catch (error) {
    next(error);
  }
};
