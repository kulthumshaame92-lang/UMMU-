import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PORT } from './config/constants.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import nutritionistRoutes from './routes/nutritionistRoutes.js';
import dietPlanRoutes from './routes/dietPlanRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Health Check & Root Info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'NutriCare Hub REST API',
    version: '1.0.0'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NutriCare Hub API',
    documentation: '/api/health',
    endpoints: [
      '/api/auth',
      '/api/assessments',
      '/api/nutritionists',
      '/api/diet-plans',
      '/api/recipes',
      '/api/bookings',
      '/api/education',
      '/api/payments',
      '/api/progress',
      '/api/admin'
    ]
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/nutritionists', nutritionistRoutes);
app.use('/api/diet-plans', dietPlanRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`🌿 NutriCare Hub Backend Server is running!`);
    console.log(`🚀 URL: http://localhost:${PORT}`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
    console.log(`===================================================`);
  });
}

export default app;
