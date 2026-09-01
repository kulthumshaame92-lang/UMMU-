import { db } from '../data/store.js';

export const logDailyProgress = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    const {
      date = new Date().toISOString().split('T')[0],
      weightKg,
      caloriesConsumed,
      proteinGrams,
      carbsGrams,
      fatsGrams,
      waterLiters,
      notes
    } = req.body;

    const progressLogs = db.get('progressLogs');
    const existingIndex = progressLogs.findIndex(l => l.userId === userId && l.date === date);

    let logEntry;
    if (existingIndex > -1) {
      logEntry = db.update('progressLogs', progressLogs[existingIndex].id, {
        weightKg: weightKg !== undefined ? Number(weightKg) : progressLogs[existingIndex].weightKg,
        caloriesConsumed: caloriesConsumed !== undefined ? Number(caloriesConsumed) : progressLogs[existingIndex].caloriesConsumed,
        proteinGrams: proteinGrams !== undefined ? Number(proteinGrams) : progressLogs[existingIndex].proteinGrams,
        carbsGrams: carbsGrams !== undefined ? Number(carbsGrams) : progressLogs[existingIndex].carbsGrams,
        fatsGrams: fatsGrams !== undefined ? Number(fatsGrams) : progressLogs[existingIndex].fatsGrams,
        waterLiters: waterLiters !== undefined ? Number(waterLiters) : progressLogs[existingIndex].waterLiters,
        notes: notes !== undefined ? notes : progressLogs[existingIndex].notes
      });
    } else {
      logEntry = db.insert('progressLogs', {
        userId,
        date,
        weightKg: weightKg !== undefined ? Number(weightKg) : null,
        caloriesConsumed: caloriesConsumed !== undefined ? Number(caloriesConsumed) : null,
        proteinGrams: proteinGrams !== undefined ? Number(proteinGrams) : null,
        carbsGrams: carbsGrams !== undefined ? Number(carbsGrams) : null,
        fatsGrams: fatsGrams !== undefined ? Number(fatsGrams) : null,
        waterLiters: waterLiters !== undefined ? Number(waterLiters) : null,
        notes: notes || ''
      });
    }

    res.status(201).json({
      success: true,
      message: 'Daily progress logged successfully.',
      log: logEntry
    });
  } catch (error) {
    next(error);
  }
};

export const getProgressHistory = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    const logs = db.get('progressLogs')
      .filter(l => l.userId === userId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
      success: true,
      count: logs.length,
      logs
    });
  } catch (error) {
    next(error);
  }
};

export const getProgressSummary = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    const logs = db.get('progressLogs')
      .filter(l => l.userId === userId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const weights = logs.filter(l => l.weightKg != null).map(l => l.weightKg);
    const initialWeight = weights.length > 0 ? weights[0] : null;
    const currentWeight = weights.length > 0 ? weights[weights.length - 1] : null;
    const weightChange = initialWeight && currentWeight ? Number((currentWeight - initialWeight).toFixed(1)) : 0;

    const avgCalories = logs.length > 0
      ? Math.round(logs.reduce((sum, l) => sum + (l.caloriesConsumed || 0), 0) / logs.length)
      : 0;

    const avgWater = logs.length > 0
      ? Number((logs.reduce((sum, l) => sum + (l.waterLiters || 0), 0) / logs.length).toFixed(1))
      : 0;

    res.json({
      success: true,
      summary: {
        totalLoggedDays: logs.length,
        initialWeightKg: initialWeight,
        currentWeightKg: currentWeight,
        weightChangeKg: weightChange,
        avgCaloriesConsumed: avgCalories,
        avgWaterLiters: avgWater
      }
    });
  } catch (error) {
    next(error);
  }
};
