import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import {
  INITIAL_NUTRITIONISTS,
  INITIAL_RECIPES,
  INITIAL_ARTICLES,
  INITIAL_DEFAULT_DIET_PLAN
} from './initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Initialize base structure
const getInitialState = () => {
  const salt = bcrypt.genSaltSync(10);
  const defaultPasswordHash = bcrypt.hashSync('Password123!', salt);

  return {
    users: [
      {
        id: "user-demo",
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        password: defaultPasswordHash,
        role: "client",
        createdAt: "2026-08-01T10:00:00Z",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        biometrics: {
          age: 29,
          gender: "female",
          heightCm: 168,
          weightKg: 63.5,
          targetWeightKg: 60.0,
          activityLevel: "moderately_active",
          primaryGoal: "metabolic_health",
          allergies: ["Dairy-sensitive"],
          dietaryPreference: "Mediterranean High-Protein"
        }
      },
      {
        id: "user-nutritionist",
        name: "Dr. Sarah Jenkins",
        email: "sarah.jenkins@nutricarehub.com",
        password: defaultPasswordHash,
        role: "nutritionist",
        nutritionistProfileId: "sarah-jenkins",
        createdAt: "2026-07-15T08:30:00Z"
      },
      {
        id: "user-admin",
        name: "Platform Administrator",
        email: "admin@nutricarehub.com",
        password: defaultPasswordHash,
        role: "admin",
        createdAt: "2026-06-01T00:00:00Z"
      }
    ],
    nutritionists: INITIAL_NUTRITIONISTS,
    recipes: INITIAL_RECIPES,
    articles: INITIAL_ARTICLES,
    dietPlans: [INITIAL_DEFAULT_DIET_PLAN],
    assessments: [
      {
        id: "assess-1",
        userId: "user-demo",
        createdAt: "2026-08-15T14:30:00Z",
        inputs: {
          age: 29,
          gender: "female",
          heightCm: 168,
          weightKg: 63.5,
          targetWeightKg: 60.0,
          activityLevel: "moderately_active",
          primaryGoal: "metabolic_health",
          dietaryPreference: "Mediterranean High-Protein",
          allergies: ["Dairy-sensitive"]
        },
        calculated: {
          bmi: 22.5,
          bmiCategory: "Normal Weight",
          bmr: 1410,
          tdee: 2185,
          targetCalories: 2120,
          macros: {
            proteinGrams: 155,
            carbsGrams: 210,
            fatsGrams: 62,
            fiberGrams: 36,
            waterLiters: 3.2
          }
        }
      }
    ],
    bookings: [
      {
        id: "book-1",
        userId: "user-demo",
        clientName: "Alex Morgan",
        clientEmail: "alex.morgan@example.com",
        nutritionistId: "sarah-jenkins",
        nutritionistName: "Dr. Sarah Jenkins, RD, PhD",
        tierId: "initial-eval",
        tierName: "Initial Comprehensive Assessment",
        appointmentDate: "2026-09-05T09:00:00Z",
        duration: "60 mins",
        amountPaid: 180,
        status: "confirmed",
        meetingLink: "https://meet.nutricarehub.com/sarah-alex-9912",
        createdAt: "2026-08-28T11:20:00Z",
        notes: "Discuss gut inflammation and metabolic reset."
      }
    ],
    payments: [
      {
        id: "tx-9941",
        userId: "user-demo",
        amount: 180,
        currency: "USD",
        description: "Initial Comprehensive Assessment with Dr. Sarah Jenkins",
        itemType: "consultation",
        status: "completed",
        paymentMethod: "Credit Card (ending in 4242)",
        invoiceNumber: "INV-2026-9941",
        createdAt: "2026-08-28T11:20:00Z"
      }
    ],
    progressLogs: [
      {
        id: "log-1",
        userId: "user-demo",
        date: "2026-08-29",
        weightKg: 63.8,
        caloriesConsumed: 2110,
        proteinGrams: 152,
        waterLiters: 3.0,
        notes: "Felt high energy during morning workout."
      },
      {
        id: "log-2",
        userId: "user-demo",
        date: "2026-08-30",
        weightKg: 63.5,
        caloriesConsumed: 2135,
        proteinGrams: 156,
        waterLiters: 3.2,
        notes: "Adhered 100% to Mediterranean meal plan."
      }
    ],
    favorites: [
      {
        userId: "user-demo",
        recipeId: "rec-1"
      }
    ]
  };
};

class DataStore {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn('Warning: Could not read db.json, generating fresh seed state:', err.message);
    }
    const fresh = getInitialState();
    this.saveData(fresh);
    return fresh;
  }

  saveData(data = this.data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving db.json:', err);
    }
  }

  // Generic collection helpers
  get(collectionName) {
    return this.data[collectionName] || [];
  }

  findById(collectionName, id) {
    const list = this.get(collectionName);
    return list.find(item => item.id === id);
  }

  insert(collectionName, item) {
    if (!this.data[collectionName]) {
      this.data[collectionName] = [];
    }
    const newItem = {
      id: item.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      createdAt: item.createdAt || new Date().toISOString(),
      ...item
    };
    this.data[collectionName].push(newItem);
    this.saveData();
    return newItem;
  }

  update(collectionName, id, updates) {
    const list = this.get(collectionName);
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    this.data[collectionName][index] = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return this.data[collectionName][index];
  }

  remove(collectionName, id) {
    const list = this.get(collectionName);
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.data[collectionName].splice(index, 1);
    this.saveData();
    return true;
  }
}

export const db = new DataStore();
