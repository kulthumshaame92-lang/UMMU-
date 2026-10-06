import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import HomePage from './components/home/HomePage';
import NutritionAssessment from './components/assessment/NutritionAssessment';
import NutritionistProfile from './components/nutritionist/NutritionistProfile';
import PersonalizedDietPlan from './components/diet/PersonalizedDietPlan';
import RecipesHub from './components/recipes/RecipesHub';
import EducationHub from './components/education/EducationHub';
import BookConsultationPage from './components/booking/BookConsultationPage';
import BookingModal from './components/modals/BookingModal';
import RecipeDetailModal from './components/recipes/RecipeDetailModal';

function MainApp() {
  const { currentPage } = useApp();
  const [selectedMealDetail, setSelectedMealDetail] = useState(null);

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'assessment':
        return <NutritionAssessment />;
      case 'nutritionist':
        return <NutritionistProfile />;
      case 'diet-plan':
        return <PersonalizedDietPlan onSelectMeal={(meal) => setSelectedMealDetail(meal)} />;
      case 'recipes':
        return <RecipesHub onSelectRecipe={(recipe) => setSelectedMealDetail(recipe)} />;
      case 'education':
        return <EducationHub />;
      case 'booking':
      case 'consultation':
        return <BookConsultationPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* Global Top Navbar */}
      <Navbar />

      {/* Main Dynamic View with top padding for fixed navbar */}
      <main className="flex-grow pt-20">
        {renderCurrentView()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <BookingModal />
      <RecipeDetailModal
        recipe={selectedMealDetail}
        onClose={() => setSelectedMealDetail(null)}
      />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
