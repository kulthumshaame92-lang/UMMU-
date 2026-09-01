import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../data/store.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants.js';

export const register = (req, res, next) => {
  try {
    const { name, email, password, role = 'client', biometrics } = req.body;

    const users = db.get('users');
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = db.insert('users', {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      biometrics: biometrics || {
        age: 28,
        gender: 'female',
        heightCm: 165,
        weightKg: 62,
        activityLevel: 'moderately_active',
        primaryGoal: 'metabolic_health'
      }
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password: _, ...safeUser } = newUser;

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};

export const login = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const users = db.get('users');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const { password: _, ...safeUser } = user;

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};

export const updateProfile = (req, res, next) => {
  try {
    const { name, avatar, biometrics } = req.body;
    const userId = req.user.id;

    const current = db.findById('users', userId);
    if (!current) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const updated = db.update('users', userId, {
      name: name || current.name,
      avatar: avatar || current.avatar,
      biometrics: biometrics ? { ...current.biometrics, ...biometrics } : current.biometrics
    });

    const { password: _, ...safeUser } = updated;

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};
