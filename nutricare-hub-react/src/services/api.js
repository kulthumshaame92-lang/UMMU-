/**
 * NutriCare Hub API Client Service
 * Connects frontend UI to the Node.js Express REST backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getToken() {
    return localStorage.getItem('nutricare_auth_token');
  }

  setToken(token) {
    if (token) {
      localStorage.setItem('nutricare_auth_token', token);
    } else {
      localStorage.removeItem('nutricare_auth_token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `API request failed with status ${response.status}`);
      }
      return data;
    } catch (error) {
      console.warn(`[API Connection Note]: ${error.message}.`);
      throw error;
    }
  }

  // --- Auth Endpoints ---
  async login(email, password) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) this.setToken(res.token);
    return res;
  }

  async register(userData) {
    const res = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (res.token) this.setToken(res.token);
    return res;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // --- Nutrition Assessment ---
  async submitAssessment(assessmentData) {
    return this.request('/assessments', {
      method: 'POST',
      body: JSON.stringify(assessmentData),
    });
  }

  async getLatestAssessment() {
    return this.request('/assessments/latest');
  }

  // --- Nutritionists ---
  async getNutritionists(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/nutritionists${query ? `?${query}` : ''}`);
  }

  async getNutritionistById(id) {
    return this.request(`/nutritionists/${id}`);
  }

  async submitReview(nutritionistId, reviewData) {
    return this.request(`/nutritionists/${nutritionistId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // --- Diet Plans ---
  async getActiveDietPlan() {
    return this.request('/diet-plans/active');
  }

  async swapMeal(planId, day, mealId, newRecipeId) {
    return this.request('/diet-plans/swap-meal', {
      method: 'POST',
      body: JSON.stringify({ planId, day, mealId, newRecipeId }),
    });
  }

  // --- Recipes ---
  async getRecipes(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/recipes${query ? `?${query}` : ''}`);
  }

  async getRecipeById(id) {
    return this.request(`/recipes/${id}`);
  }

  async toggleFavorite(recipeId) {
    return this.request(`/recipes/${recipeId}/favorite`, {
      method: 'POST',
    });
  }

  // --- Bookings ---
  async getBookings() {
    return this.request('/bookings');
  }

  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  // --- Education Hub ---
  async getArticles(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/education${query ? `?${query}` : ''}`);
  }

  // --- Payments & Checkout ---
  async checkout(paymentData) {
    return this.request('/payments/checkout', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // --- Progress Tracking ---
  async logProgress(progressData) {
    return this.request('/progress/log', {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  }

  async getProgressHistory() {
    return this.request('/progress/history');
  }

  // --- Admin ---
  async getAdminMetrics() {
    return this.request('/admin/metrics');
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
