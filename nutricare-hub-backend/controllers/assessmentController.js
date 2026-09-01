import { db } from '../data/store.js';
import { ACTIVITY_LEVELS, ASSESSMENT_GOALS } from '../config/constants.js';

export const submitAssessment = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-guest';
    const {
      age,
      gender = 'female',
      heightCm,
      weightKg,
      targetWeightKg,
      activityLevel = 'moderately_active',
      primaryGoal = 'metabolic_health',
      dietaryPreference = 'Mediterranean High-Protein',
      allergies = [],
      dailyMealCount = 3,
      healthConditions = []
    } = req.body;

    const numAge = Number(age);
    const numHeight = Number(heightCm);
    const numWeight = Number(weightKg);
    const numTargetWeight = Number(targetWeightKg || weightKg);

    // 1. BMI Calculation
    const heightInMeters = numHeight / 100;
    const bmi = Number((numWeight / (heightInMeters * heightInMeters)).toFixed(1));
    let bmiCategory = 'Normal Weight';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi >= 25 && bmi < 29.9) bmiCategory = 'Overweight';
    else if (bmi >= 30) bmiCategory = 'Obese';

    // 2. BMR Calculation (Mifflin-St Jeor)
    let bmr = 0;
    if (gender.toLowerCase() === 'male') {
      bmr = Math.round(10 * numWeight + 6.25 * numHeight - 5 * numAge + 5);
    } else {
      bmr = Math.round(10 * numWeight + 6.25 * numHeight - 5 * numAge - 161);
    }

    // 3. TDEE
    const activityKey = activityLevel.toUpperCase();
    const multiplier = ACTIVITY_LEVELS[activityKey] || 1.45;
    const tdee = Math.round(bmr * multiplier);

    // 4. Target Calories according to goal
    let targetCalories = tdee;
    let proteinRatio = 0.28;
    let carbsRatio = 0.45;
    let fatsRatio = 0.27;

    switch (primaryGoal) {
      case 'weight_loss':
        targetCalories = Math.max(1300, Math.round(tdee - 450));
        proteinRatio = 0.35;
        carbsRatio = 0.35;
        fatsRatio = 0.30;
        break;
      case 'muscle_gain':
        targetCalories = Math.round(tdee + 350);
        proteinRatio = 0.30;
        carbsRatio = 0.50;
        fatsRatio = 0.20;
        break;
      case 'gut_health':
      case 'longevity':
      case 'metabolic_health':
      default:
        targetCalories = Math.round(tdee);
        proteinRatio = 0.30;
        carbsRatio = 0.45;
        fatsRatio = 0.25;
        break;
    }

    // 5. Macro Distribution (grams)
    const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
    const carbsGrams = Math.round((targetCalories * carbsRatio) / 4);
    const fatsGrams = Math.round((targetCalories * fatsRatio) / 9);
    const fiberGrams = Math.round((targetCalories / 1000) * 16);
    const waterLiters = Number((numWeight * 0.045).toFixed(1));

    const calculated = {
      bmi,
      bmiCategory,
      bmr,
      tdee,
      targetCalories,
      macros: {
        proteinGrams,
        carbsGrams,
        fatsGrams,
        fiberGrams,
        waterLiters
      },
      recommendedProtocol: {
        title: primaryGoal === 'muscle_gain' ? 'Lean Hypertrophy & Protein Pacing Protocol' :
               primaryGoal === 'weight_loss' ? 'Metabolic Deficit & Satiety Engineering Protocol' :
               'Metabolic Vitality & Anti-Inflammatory Protocol',
        recommendedNutritionist: primaryGoal === 'muscle_gain' ? 'marcus-vance' : 'sarah-jenkins',
        keyRecommendations: [
          `Target ${proteinGrams}g of daily high-quality protein paced across ${dailyMealCount} meals.`,
          `Hydrate with minimum ${waterLiters}L of water and electrolyte-rich beverages daily.`,
          `Maintain ${fiberGrams}g+ diverse prebiotic fiber to stimulate microbiome short-chain fatty acids.`
        ]
      }
    };

    const newAssessment = db.insert('assessments', {
      userId,
      inputs: {
        age: numAge,
        gender,
        heightCm: numHeight,
        weightKg: numWeight,
        targetWeightKg: numTargetWeight,
        activityLevel,
        primaryGoal,
        dietaryPreference,
        allergies,
        dailyMealCount,
        healthConditions
      },
      calculated
    });

    // If user is authenticated, update their biometrics profile
    if (req.user && req.user.id !== 'user-guest') {
      db.update('users', req.user.id, {
        biometrics: {
          age: numAge,
          gender,
          heightCm: numHeight,
          weightKg: numWeight,
          targetWeightKg: numTargetWeight,
          activityLevel,
          primaryGoal,
          dietaryPreference,
          allergies
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Nutrition assessment processed successfully.',
      assessment: newAssessment
    });
  } catch (error) {
    next(error);
  }
};

export const getLatestAssessment = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    const assessments = db.get('assessments')
      .filter(a => a.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (assessments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No previous assessment found for this user.'
      });
    }

    res.json({
      success: true,
      assessment: assessments[0]
    });
  } catch (error) {
    next(error);
  }
};

export const getAssessmentHistory = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    const history = db.get('assessments')
      .filter(a => a.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: history.length,
      history
    });
  } catch (error) {
    next(error);
  }
};
