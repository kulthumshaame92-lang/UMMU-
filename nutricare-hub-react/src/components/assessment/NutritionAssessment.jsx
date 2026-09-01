import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, Activity, Apple, Target, User, HeartPulse, Flame } from 'lucide-react';

export default function NutritionAssessment() {
  const { assessmentData, updateAssessment, generatePlanFromAssessment, setCurrentPage } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  const allergyOptions = [
    "Dairy-Free",
    "Gluten-Free",
    "Nut-Free",
    "Soy-Free",
    "Shellfish-Free",
    "Egg-Free",
    "Low-FODMAP"
  ];

  const handleAllergyToggle = (allergy) => {
    const current = assessmentData.allergies || [];
    if (current.includes(allergy)) {
      updateAssessment({ allergies: current.filter(a => a !== allergy) });
    } else {
      updateAssessment({ allergies: [...current, allergy] });
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      generatePlanFromAssessment(assessmentData);
    }, 1200);
  };

  return (
    <div className="w-full min-h-[85vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative Radial Gradients */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, #f59e0b 0%, transparent 65%)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-1/2 h-full -z-10 opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom left, #6cf8bb 0%, transparent 65%)'
        }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/20 text-on-primary-container font-semibold text-xs uppercase tracking-wider mb-4 border border-primary-container/30">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Interactive Health Intake</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-on-surface mb-3">
            Your Nutrition Journey Starts Here
          </h1>
          <p className="text-base text-on-surface-variant max-w-xl mx-auto">
            Help our clinical dietician algorithms understand your body, lifestyle, and goals to craft a personalized wellness protocol.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-surface-container -z-10 rounded-full" />
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary-container -z-10 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: currentStep === 1 ? '16%' : currentStep === 2 ? '50%' : '100%'
              }}
            />

            {/* Step 1 Indicator */}
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-1.5 transition-all shadow-xs ${
                  currentStep > 1 
                    ? 'bg-secondary text-white' 
                    : currentStep === 1 
                    ? 'bg-primary-container text-on-primary-container ring-4 ring-primary-container/20' 
                    : 'bg-surface text-on-surface-variant border border-outline-variant'
                }`}
              >
                {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className={`text-xs font-semibold ${currentStep === 1 ? 'text-primary' : 'text-on-surface-variant'}`}>
                Basics
              </span>
            </div>

            {/* Step 2 Indicator */}
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-1.5 transition-all shadow-xs ${
                  currentStep > 2 
                    ? 'bg-secondary text-white' 
                    : currentStep === 2 
                    ? 'bg-primary-container text-on-primary-container ring-4 ring-primary-container/20' 
                    : 'bg-surface text-on-surface-variant border border-outline-variant'
                }`}
              >
                {currentStep > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
              </div>
              <span className={`text-xs font-semibold ${currentStep === 2 ? 'text-primary' : 'text-on-surface-variant'}`}>
                Dietary
              </span>
            </div>

            {/* Step 3 Indicator */}
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-1.5 transition-all shadow-xs ${
                  currentStep === 3 
                    ? 'bg-primary-container text-on-primary-container ring-4 ring-primary-container/20' 
                    : 'bg-surface text-on-surface-variant border border-outline-variant'
                }`}
              >
                3
              </div>
              <span className={`text-xs font-semibold ${currentStep === 3 ? 'text-primary' : 'text-on-surface-variant'}`}>
                Goals
              </span>
            </div>
          </div>
        </div>

        {/* Assessment Card Form */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-surface-container shadow-ambient-md">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Health Data */}
            {currentStep === 1 && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-surface-container">
                  <div className="w-9 h-9 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">Basic Health Data</h2>
                    <p className="text-xs text-on-surface-variant">Provide standard metrics used for metabolic rate estimation.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                      Age (Years)
                    </label>
                    <input
                      type="number"
                      value={assessmentData.age}
                      onChange={(e) => updateAssessment({ age: e.target.value })}
                      placeholder="e.g. 28"
                      className="w-full bg-surface border border-outline-variant rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                      Gender Identity
                    </label>
                    <select
                      value={assessmentData.gender}
                      onChange={(e) => updateAssessment({ gender: e.target.value })}
                      className="w-full bg-surface border border-outline-variant rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={assessmentData.height}
                      onChange={(e) => updateAssessment({ height: e.target.value })}
                      placeholder="e.g. 172"
                      className="w-full bg-surface border border-outline-variant rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                      Current Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={assessmentData.weight}
                      onChange={(e) => updateAssessment({ weight: e.target.value })}
                      placeholder="e.g. 64"
                      className="w-full bg-surface border border-outline-variant rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
                    Weekly Activity Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'sedentary', title: 'Sedentary', desc: 'Desk job, little to no exercise', icon: 'weekend' },
                      { id: 'moderate', title: 'Moderately Active', desc: 'Exercise 3-5 days/week', icon: 'directions_walk' },
                      { id: 'very_active', title: 'Very Active', desc: 'Heavy sports or daily training', icon: 'fitness_center' },
                    ].map((act) => {
                      const isSelected = assessmentData.activityLevel === act.id;
                      return (
                        <div
                          key={act.id}
                          onClick={() => updateAssessment({ activityLevel: act.id })}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                            isSelected
                              ? 'bg-primary-container/15 border-primary text-primary font-bold shadow-xs'
                              : 'bg-surface border-outline-variant hover:bg-surface-container-low text-on-surface'
                          }`}
                        >
                          <span className="material-symbols-outlined text-3xl mb-2 text-primary">
                            {act.icon}
                          </span>
                          <span className="text-sm font-semibold mb-1">{act.title}</span>
                          <span className="text-xs text-on-surface-variant/80">{act.desc}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Dietary Preferences */}
            {currentStep === 2 && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-surface-container">
                  <div className="w-9 h-9 rounded-lg bg-secondary-container/50 text-secondary flex items-center justify-center">
                    <Apple className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">Dietary Preferences & Allergies</h2>
                    <p className="text-xs text-on-surface-variant">We tailor recipes and ingredient swaps strictly to your nutrition model.</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
                    Primary Diet Pattern
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'omnivore', label: 'Omnivore' },
                      { id: 'mediterranean', label: 'Mediterranean' },
                      { id: 'vegetarian', label: 'Vegetarian' },
                      { id: 'vegan', label: 'Vegan' },
                      { id: 'pescatarian', label: 'Pescatarian' },
                      { id: 'keto', label: 'Keto / Low-Carb' },
                      { id: 'paleo', label: 'Paleo' },
                      { id: 'plant-forward', label: 'Plant-Forward' },
                    ].map((diet) => {
                      const isSelected = assessmentData.dietType === diet.id;
                      return (
                        <div
                          key={diet.id}
                          onClick={() => updateAssessment({ dietType: diet.id })}
                          className={`p-3 rounded-xl border text-center cursor-pointer text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-primary-container text-on-primary-container border-primary-container shadow-xs'
                              : 'bg-surface border-outline-variant hover:bg-surface-container-low text-on-surface'
                          }`}
                        >
                          {diet.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
                    Allergies & Sensitivities (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {allergyOptions.map((allergy) => {
                      const isChecked = (assessmentData.allergies || []).includes(allergy);
                      return (
                        <button
                          type="button"
                          key={allergy}
                          onClick={() => handleAllergyToggle(allergy)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                            isChecked
                              ? 'bg-[#10B981]/15 text-[#006c49] border-[#10B981]'
                              : 'bg-surface text-on-surface-variant border-outline-variant hover:bg-surface-container-low'
                          }`}
                        >
                          {isChecked ? `✓ ${allergy}` : allergy}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Nutrition Goals */}
            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-surface-container">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-primary flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-on-surface">Health Objectives & Notes</h2>
                    <p className="text-xs text-on-surface-variant">Define what success looks like for your personalized protocol.</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
                    Primary Goal
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'weight_loss', title: 'Weight Optimization', desc: 'Sustainable fat loss & metabolic shift', icon: 'trending_down' },
                      { id: 'metabolic_health', title: 'Vitality & Longevity', desc: 'Sustained energy & gut optimization', icon: 'balance' },
                      { id: 'muscle_gain', title: 'Lean Muscle & Strength', desc: 'Hypertrophy & athletic performance', icon: 'trending_up' },
                    ].map((goal) => {
                      const isSelected = assessmentData.primaryGoal === goal.id;
                      return (
                        <div
                          key={goal.id}
                          onClick={() => updateAssessment({ primaryGoal: goal.id })}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                            isSelected
                              ? 'bg-primary-container/15 border-primary text-primary font-bold shadow-xs'
                              : 'bg-surface border-outline-variant hover:bg-surface-container-low text-on-surface'
                          }`}
                        >
                          <span className="material-symbols-outlined text-3xl mb-2 text-primary">
                            {goal.icon}
                          </span>
                          <span className="text-sm font-semibold mb-1">{goal.title}</span>
                          <span className="text-xs text-on-surface-variant/80">{goal.desc}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                    Additional Health Concerns or Dietitian Notes
                  </label>
                  <textarea
                    rows="3"
                    value={assessmentData.additionalNotes}
                    onChange={(e) => updateAssessment({ additionalNotes: e.target.value })}
                    placeholder="E.g., afternoon brain fog, wanting higher protein breakfast ideas, preparing for marathon..."
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* Navigation & Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-surface-container">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm hover:bg-surface-container transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-semibold px-7 py-3 rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-amber-950 text-white font-semibold px-8 py-3 rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>
                      <span>Calculating Protocol...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete & Generate Plan</span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
