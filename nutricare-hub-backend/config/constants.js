import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || 'nutricare_hub_jwt_secret_key_2026_super_secure';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const USER_ROLES = {
  CLIENT: 'client',
  NUTRITIONIST: 'nutritionist',
  ADMIN: 'admin'
};

export const ASSESSMENT_GOALS = {
  WEIGHT_LOSS: 'weight_loss',
  MUSCLE_GAIN: 'muscle_gain',
  METABOLIC_HEALTH: 'metabolic_health',
  GUT_HEALTH: 'gut_health',
  LONGEVITY: 'longevity',
  MAINTENANCE: 'maintenance'
};

export const ACTIVITY_LEVELS = {
  SEDENTARY: 1.2,
  LIGHTLY_ACTIVE: 1.375,
  MODERATELY_ACTIVE: 1.55,
  VERY_ACTIVE: 1.725,
  EXTRA_ACTIVE: 1.9
};
