import { db } from '../data/store.js';

export const getAllNutritionists = (req, res, next) => {
  try {
    const { specialty, search, minRating } = req.query;
    let list = db.get('nutritionists');

    if (specialty) {
      const specLower = specialty.toLowerCase();
      list = list.filter(n => n.specialties.some(s => s.toLowerCase().includes(specLower)));
    }

    if (search) {
      const sLower = search.toLowerCase();
      list = list.filter(n =>
        n.name.toLowerCase().includes(sLower) ||
        n.title.toLowerCase().includes(sLower) ||
        n.about.toLowerCase().includes(sLower)
      );
    }

    if (minRating) {
      const ratingVal = parseFloat(minRating);
      list = list.filter(n => n.rating >= ratingVal);
    }

    res.json({
      success: true,
      count: list.length,
      nutritionists: list
    });
  } catch (error) {
    next(error);
  }
};

export const getNutritionistById = (req, res, next) => {
  try {
    const { id } = req.params;
    const nutritionist = db.findById('nutritionists', id);

    if (!nutritionist) {
      return res.status(404).json({
        success: false,
        message: `Nutritionist with ID '${id}' was not found.`
      });
    }

    res.json({
      success: true,
      nutritionist
    });
  } catch (error) {
    next(error);
  }
};

export const addReview = (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment, authorName, authorRole } = req.body;
    const nutritionist = db.findById('nutritionists', id);

    if (!nutritionist) {
      return res.status(404).json({
        success: false,
        message: `Nutritionist with ID '${id}' was not found.`
      });
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      author: authorName || (req.user ? req.user.name : 'Verified Client'),
      role: authorRole || 'Verified Client',
      rating: Number(rating) || 5,
      date: new Date().toISOString().split('T')[0],
      comment,
      avatar: req.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    };

    const currentReviews = nutritionist.reviews || [];
    currentReviews.unshift(newReview);

    // Recalculate average rating
    const totalScore = currentReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = Number((totalScore / currentReviews.length).toFixed(2));

    const updated = db.update('nutritionists', id, {
      reviews: currentReviews,
      reviewCount: currentReviews.length,
      rating: avgRating
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully.',
      review: newReview,
      nutritionistRating: updated.rating,
      reviewCount: updated.reviewCount
    });
  } catch (error) {
    next(error);
  }
};

export const getAvailableSlots = (req, res, next) => {
  try {
    const { id } = req.params;
    const nutritionist = db.findById('nutritionists', id);

    if (!nutritionist) {
      return res.status(404).json({
        success: false,
        message: `Nutritionist with ID '${id}' was not found.`
      });
    }

    res.json({
      success: true,
      nutritionistId: id,
      availableSlots: nutritionist.availableSlots || []
    });
  } catch (error) {
    next(error);
  }
};
