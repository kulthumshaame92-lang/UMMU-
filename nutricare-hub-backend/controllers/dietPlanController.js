import { db } from '../data/store.js';

export const getActiveDietPlan = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    const plans = db.get('dietPlans');
    
    // Find plan specifically for this user, or fallback to default
    let activePlan = plans.find(p => p.userId === userId) || plans[0];

    if (!activePlan) {
      return res.status(404).json({
        success: false,
        message: 'No diet plan available.'
      });
    }

    res.json({
      success: true,
      plan: activePlan
    });
  } catch (error) {
    next(error);
  }
};

export const getDietPlanById = (req, res, next) => {
  try {
    const { id } = req.params;
    const plan = db.findById('dietPlans', id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: `Diet plan with ID '${id}' was not found.`
      });
    }

    res.json({
      success: true,
      plan
    });
  } catch (error) {
    next(error);
  }
};

export const swapMeal = (req, res, next) => {
  try {
    const { planId = 'plan-default', day = 'Monday', mealId, newRecipeId } = req.body;
    const plan = db.findById('dietPlans', planId);

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Diet plan not found.' });
    }

    const recipe = db.findById('recipes', newRecipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Replacement recipe not found.' });
    }

    const dayData = plan.days[day];
    if (!dayData || !dayData.meals) {
      return res.status(400).json({ success: false, message: `Day '${day}' not found in diet plan.` });
    }

    const mealIndex = dayData.meals.findIndex(m => m.id === mealId);
    if (mealIndex === -1) {
      return res.status(404).json({ success: false, message: `Meal with ID '${mealId}' not found in ${day}.` });
    }

    const existingMeal = dayData.meals[mealIndex];

    // Create the swapped meal entry
    const swappedMeal = {
      ...existingMeal,
      title: recipe.title,
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fats: recipe.fats,
      fiber: recipe.fiber || 6,
      image: recipe.image,
      ingredients: recipe.ingredients,
      prepTime: recipe.prepTime,
      tips: `Swapped with ${recipe.category} favorite.`
    };

    dayData.meals[mealIndex] = swappedMeal;

    // Recalculate day calories
    dayData.totalCalories = dayData.meals.reduce((sum, m) => sum + (m.calories || 0), 0);

    const updatedPlan = db.update('dietPlans', planId, {
      days: {
        ...plan.days,
        [day]: dayData
      }
    });

    res.json({
      success: true,
      message: 'Meal swapped successfully.',
      swappedMeal,
      updatedPlan
    });
  } catch (error) {
    next(error);
  }
};

export const createDietPlan = (req, res, next) => {
  try {
    const {
      userId,
      clientName,
      planTitle,
      prescribedBy,
      targetCal,
      durationWeeks = 8,
      macros,
      days
    } = req.body;

    const newPlan = db.insert('dietPlans', {
      userId: userId || req.user?.id || 'user-demo',
      clientName: clientName || req.user?.name || 'Client',
      planTitle,
      prescribedBy: prescribedBy || 'NutriCare Clinical Team',
      targetCal: Number(targetCal) || 2000,
      currentCal: Number(targetCal) || 2000,
      durationWeeks: Number(durationWeeks),
      currentWeek: 1,
      macros: macros || {
        protein: { current: 140, target: 150, unit: "g", percentage: 30 },
        carbs: { current: 200, target: 210, unit: "g", percentage: 45 },
        fats: { current: 55, target: 60, unit: "g", percentage: 25 },
        fiber: { current: 32, target: 35, unit: "g", percentage: 90 },
        water: { current: 2.5, target: 3.2, unit: "L", percentage: 80 }
      },
      days: days || {}
    });

    res.status(201).json({
      success: true,
      message: 'Diet plan created successfully.',
      plan: newPlan
    });
  } catch (error) {
    next(error);
  }
};
