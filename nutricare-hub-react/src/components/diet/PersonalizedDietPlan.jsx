import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Printer, 
  Download, 
  Droplet, 
  Edit3, 
  Sun, 
  Sunrise, 
  Moon, 
  Sparkles, 
  Utensils, 
  Calendar, 
  Check, 
  ChevronRight, 
  Plus, 
  Info,
  Clock
} from 'lucide-react';

export default function PersonalizedDietPlan({ onSelectMeal }) {
  const { 
    dietPlan, 
    selectedDay, 
    setSelectedDay, 
    waterIntake, 
    setWaterIntake, 
    showToast,
    setCurrentPage 
  } = useApp();

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const currentDayData = dietPlan.days[selectedDay] || dietPlan.days['Monday'];

  const handleWaterClick = (index) => {
    // 5 drops total representing 0.7L each
    const newAmount = (index + 1) * 0.7;
    setWaterIntake(parseFloat(newAmount.toFixed(1)));
    showToast(`Hydration logged: ${newAmount.toFixed(1)}L today`, 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast("Generating high-resolution Diet Protocol PDF...", "success");
    setTimeout(() => {
      showToast("Download started: NutriCare_Personalized_Plan.pdf", "success");
    }, 1200);
  };

  // Icon mapping for meal types
  const getMealIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'breakfast':
        return <Sunrise className="w-5 h-5 text-primary" />;
      case 'lunch':
        return <Sun className="w-5 h-5 text-secondary" />;
      case 'dinner':
        return <Moon className="w-5 h-5 text-inverse-surface" />;
      default:
        return <Utensils className="w-5 h-5 text-tertiary" />;
    }
  };

  return (
    <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header Banner */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pb-6 border-b border-surface-container">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Clinical Protocol • Week {dietPlan.currentWeek} of {dietPlan.durationWeeks}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-on-surface">
            {dietPlan.clientName}'s {dietPlan.planTitle || "Vitality Plan"}
          </h1>
          <p className="text-sm text-on-surface-variant mt-1 flex items-center gap-2">
            <span>Prescribed by {dietPlan.prescribedBy}</span>
            <span>•</span>
            <span className="text-secondary font-medium">Updated 2 days ago</span>
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentPage('assessment')}
            className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface font-semibold text-xs hover:bg-surface-container-low transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-primary" />
            <span>Recalibrate</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface font-semibold text-xs hover:bg-surface-container-low transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Plan</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-5 py-2.5 rounded-xl bg-primary-container hover:bg-amber-500 text-on-primary-container font-semibold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </header>

      {/* Top Bento Widgets: Daily Targets Macros, Hydration & Dietitian Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        {/* Macros Bento (7 cols) */}
        <div className="lg:col-span-7 bg-surface rounded-2xl p-6 sm:p-7 border border-surface-container shadow-ambient-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-on-surface">Daily Macronutrient Targets</h3>
              <p className="text-xs text-on-surface-variant">Caloric intake calibrated to metabolic expenditure</p>
            </div>
            <span className="px-3 py-1.5 bg-secondary-container/30 text-on-secondary-container rounded-full text-xs font-bold border border-secondary-container/40">
              {dietPlan.targetCal} Kcal / day
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-around">
            {/* Donut Visual via Conic Gradient */}
            <div 
              className="relative w-36 h-36 flex items-center justify-center rounded-full shrink-0 shadow-inner"
              style={{
                background: 'conic-gradient(#f59e0b 0% 35%, #006c49 35% 75%, #ffb95f 75% 100%)'
              }}
            >
              <div className="w-28 h-28 bg-surface rounded-full flex flex-col items-center justify-center shadow-xs">
                <span className="font-display text-2xl font-bold text-on-surface">100%</span>
                <span className="text-[11px] font-semibold text-secondary">Target On Track</span>
              </div>
            </div>

            {/* Macro Bars */}
            <div className="flex-1 w-full space-y-4">
              {/* Protein Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-on-surface flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                    Protein ({dietPlan.macros?.protein?.percentage || 30}%)
                  </span>
                  <span className="text-on-surface-variant font-medium">
                    {dietPlan.macros?.protein?.current || 140}g / {dietPlan.macros?.protein?.target || 150}g
                  </span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-primary-container h-full rounded-full transition-all duration-700" 
                    style={{ width: `${Math.min(100, ((dietPlan.macros?.protein?.current || 140) / (dietPlan.macros?.protein?.target || 150)) * 100)}%` }} 
                  />
                </div>
              </div>

              {/* Carbs Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-on-surface flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    Carbohydrates ({dietPlan.macros?.carbs?.percentage || 45}%)
                  </span>
                  <span className="text-on-surface-variant font-medium">
                    {dietPlan.macros?.carbs?.current || 190}g / {dietPlan.macros?.carbs?.target || 200}g
                  </span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-secondary h-full rounded-full transition-all duration-700" 
                    style={{ width: `${Math.min(100, ((dietPlan.macros?.carbs?.current || 190) / (dietPlan.macros?.carbs?.target || 200)) * 100)}%` }} 
                  />
                </div>
              </div>

              {/* Fats Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-on-surface flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    Healthy Fats ({dietPlan.macros?.fats?.percentage || 25}%)
                  </span>
                  <span className="text-on-surface-variant font-medium">
                    {dietPlan.macros?.fats?.current || 58}g / {dietPlan.macros?.fats?.target || 62}g
                  </span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all duration-700" 
                    style={{ width: `${Math.min(100, ((dietPlan.macros?.fats?.current || 58) / (dietPlan.macros?.fats?.target || 62)) * 100)}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hydration Tracker & Clinical Notes (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Hydration Tracker Card */}
          <div className="bg-surface rounded-2xl p-5 border border-surface-container shadow-ambient-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-secondary" />
                <h3 className="text-base font-bold text-on-surface">Hydration Tracker</h3>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Logged: <span className="font-bold text-secondary">{waterIntake}L</span> / 3.5L Target
              </p>
            </div>

            {/* Clickable 5-drop interactive tracker */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((idx) => {
                const filled = waterIntake >= (idx + 1) * 0.7;
                return (
                  <button
                    key={idx}
                    onClick={() => handleWaterClick(idx)}
                    title={`Click to set ${(idx + 1) * 0.7}L`}
                    className="p-1 rounded-lg hover:bg-surface-container transition-transform active:scale-90 cursor-pointer"
                  >
                    <Droplet
                      className={`w-6 h-6 transition-colors ${
                        filled ? 'text-secondary fill-secondary' : 'text-surface-variant fill-surface-variant/40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nutritionist Clinical Notes */}
          <div className="bg-surface rounded-2xl p-5 border border-surface-container shadow-ambient-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Edit3 className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                  Dietitian Clinical Notes
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant italic leading-relaxed">
                "Great consistency this week! Try swapping dinner complex carbs for leafy greens and roasted asparagus to optimize nighttime digestion. Keep prioritizing the morning mineral hydration drink."
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-surface-container flex items-center justify-between text-[11px] text-on-surface-variant font-medium">
              <span>Dr. Sarah Jenkins, RD</span>
              <span className="text-primary font-bold">Verified Clinical Note</span>
            </div>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs (Mon - Sun) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-on-surface">
            Daily Meal Blueprint
          </h2>
          <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
            {currentDayData.summary || "High Energy & Sustained Focus"}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {daysList.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-primary-container text-on-primary-container shadow-sm ring-2 ring-primary-container'
                    : 'bg-surface border border-surface-container hover:border-primary text-on-surface'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Meals Schedule Cards */}
      <div className="space-y-4">
        {currentDayData.meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-surface rounded-2xl p-5 sm:p-6 border border-surface-container shadow-ambient-sm hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-5"
          >
            {/* Meal Time & Label Tag */}
            <div className="w-full md:w-44 flex md:flex-col justify-between md:justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-surface-container pb-3 md:pb-0 md:pr-4 shrink-0">
              <div className="flex items-center gap-2">
                {getMealIcon(meal.type)}
                <h3 className="font-bold text-on-surface text-base">{meal.type}</h3>
              </div>
              <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-primary" />
                {meal.time}
              </span>
            </div>

            {/* Meal Image & Description */}
            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full sm:w-28 h-28 sm:h-24 rounded-xl object-cover shadow-xs shrink-0"
              />
              <div className="flex-1">
                <h4 className="text-base font-bold text-on-surface mb-1">
                  {meal.title}
                </h4>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-2.5">
                  {meal.ingredients ? meal.ingredients.join(', ') : 'High vitality ingredients tailored to your metabolic blueprint.'}
                </p>

                {/* Macros Badges */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 bg-surface-container text-on-surface-variant text-[11px] font-bold rounded-md">
                    🔥 {meal.calories} Kcal
                  </span>
                  <span className="px-2.5 py-1 bg-primary-container/15 text-primary text-[11px] font-bold rounded-md">
                    {meal.protein}g Protein
                  </span>
                  <span className="px-2.5 py-1 bg-secondary-container/30 text-secondary text-[11px] font-bold rounded-md">
                    {meal.carbs}g Carbs
                  </span>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-[11px] font-bold rounded-md">
                    {meal.fats}g Fats
                  </span>
                </div>
              </div>
            </div>

            {/* Meal Action CTA */}
            <div className="w-full md:w-auto flex justify-end shrink-0 pt-2 md:pt-0">
              <button
                onClick={() => onSelectMeal && onSelectMeal(meal)}
                className="px-4 py-2 rounded-xl bg-surface-container hover:bg-primary-container hover:text-on-primary-container transition-all text-xs font-bold text-on-surface cursor-pointer flex items-center gap-1.5"
              >
                <span>Details & Swap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
