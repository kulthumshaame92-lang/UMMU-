import { db } from '../data/store.js';

export const getAdminMetrics = (req, res, next) => {
  try {
    const users = db.get('users');
    const nutritionists = db.get('nutritionists');
    const recipes = db.get('recipes');
    const articles = db.get('articles');
    const dietPlans = db.get('dietPlans');
    const bookings = db.get('bookings');
    const payments = db.get('payments');

    const totalRevenue = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    const clientCount = users.filter(u => u.role === 'client').length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

    res.json({
      success: true,
      metrics: {
        totalUsers: users.length,
        totalClients: clientCount,
        totalNutritionists: nutritionists.length,
        totalRecipes: recipes.length,
        totalArticles: articles.length,
        activeDietPlans: dietPlans.length,
        totalBookings: bookings.length,
        confirmedBookings,
        totalRevenueUSD: totalRevenue
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = (req, res, next) => {
  try {
    const users = db.get('users').map(u => {
      const { password, ...safeUser } = u;
      return safeUser;
    });

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTransactions = (req, res, next) => {
  try {
    const payments = db.get('payments').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: payments.length,
      transactions: payments
    });
  } catch (error) {
    next(error);
  }
};
