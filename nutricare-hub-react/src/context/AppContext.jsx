import React, { createContext, useContext, useState, useEffect } from 'react';
import { NUTRITIONISTS } from '../data/nutritionistsData';
import { DEFAULT_DIET_PLAN } from '../data/dietPlansData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPageState] = useState('home');
  const [selectedNutritionist, setSelectedNutritionist] = useState(NUTRITIONISTS[0]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [toast, setToast] = useState(null);

  // User assessment profile
  const [assessmentData, setAssessmentData] = useState({
    age: '28',
    gender: 'female',
    height: '172',
    weight: '64',
    activityLevel: 'moderate',
    dietType: 'mediterranean',
    allergies: ['Gluten-Sensitive'],
    primaryGoal: 'metabolic_health',
    targetWeight: '61',
    timeframe: '8_weeks',
    additionalNotes: 'Looking to boost afternoon focus and reduce gut bloating.'
  });

  // User's active diet plan
  const [dietPlan, setDietPlan] = useState(DEFAULT_DIET_PLAN);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [waterIntake, setWaterIntake] = useState(2.8);

  const setCurrentPage = (page) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const updateAssessment = (fields) => {
    setAssessmentData(prev => ({ ...prev, ...fields }));
  };

  const generatePlanFromAssessment = (customData) => {
    const data = customData || assessmentData;
    // Calculate estimated TDEE
    const weightNum = parseFloat(data.weight) || 65;
    const heightNum = parseFloat(data.height) || 170;
    const ageNum = parseFloat(data.age) || 30;

    let bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum);
    bmr += (data.gender === 'male' ? 5 : -161);

    const mults = { sedentary: 1.2, light: 1.375, moderate: 1.55, very_active: 1.725 };
    const factor = mults[data.activityLevel] || 1.5;
    let tdee = Math.round(bmr * factor);

    if (data.primaryGoal === 'weight_loss') tdee -= 400;
    if (data.primaryGoal === 'muscle_gain') tdee += 350;

    const proteinGrams = Math.round(weightNum * 2.1);
    const fatGrams = Math.round((tdee * 0.25) / 9);
    const carbGrams = Math.round((tdee - (proteinGrams * 4) - (fatGrams * 9)) / 4);

    const updatedPlan = {
      ...DEFAULT_DIET_PLAN,
      clientName: "Alex Morgan",
      planTitle: `${data.dietType.charAt(0).toUpperCase() + data.dietType.slice(1)} Wellness Protocol`,
      targetCal: tdee,
      currentCal: tdee - 30,
      macros: {
        protein: { current: proteinGrams - 5, target: proteinGrams, unit: "g", percentage: 30, color: "primary" },
        carbs: { current: carbGrams - 5, target: carbGrams, unit: "g", percentage: 45, color: "secondary" },
        fats: { current: fatGrams - 3, target: fatGrams, unit: "g", percentage: 25, color: "tertiary" },
        fiber: { current: 36, target: 38, unit: "g", percentage: 95, color: "emerald" },
        water: { current: 2.8, target: 3.5, unit: "L", percentage: 80 }
      }
    };

    setDietPlan(updatedPlan);
    showToast("Personalized diet plan generated successfully!", "success");
    setCurrentPage('diet-plan');
  };

  const openBooking = (tier = null) => {
    setSelectedTier(tier || selectedNutritionist.consultationTiers[0]);
    setIsBookingModalOpen(true);
  };

  const closeBooking = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedNutritionist,
        setSelectedNutritionist,
        isBookingModalOpen,
        openBooking,
        closeBooking,
        selectedTier,
        setSelectedTier,
        assessmentData,
        updateAssessment,
        generatePlanFromAssessment,
        dietPlan,
        setDietPlan,
        selectedDay,
        setSelectedDay,
        waterIntake,
        setWaterIntake,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
