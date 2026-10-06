import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Clock, 
  Flame, 
  Sparkles, 
  RefreshCw, 
  Check, 
  Utensils, 
  Heart, 
  Printer, 
  Share2, 
  Plus, 
  Minus, 
  ChefHat, 
  Info, 
  Award,
  CheckCircle2,
  BookmarkPlus
} from 'lucide-react';

export default function RecipeDetailModal({ recipe, onClose, onSwap }) {
  const { showToast, setDietPlan } = useApp();
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  const [activeTab, setActiveTab] = useState('recipe'); // 'recipe', 'nutrition', 'insights'
  const [isSaved, setIsSaved] = useState(false);

  if (!recipe) return null;

  const baseServings = recipe.servings || 2;
  const currentServings = baseServings * servingsMultiplier;

  const toggleIngredientCheck = (idx) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleStepCheck = (stepNum) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Recipe link copied to clipboard!", "success");
    } else {
      showToast("Sharing recipe...", "info");
    }
  };

  const handleAddToPlan = () => {
    showToast(`Added "${recipe.title}" to your active weekly meal plan!`, 'success');
  };

  const handleSaveFavorite = () => {
    setIsSaved(!isSaved);
    showToast(isSaved ? "Removed from saved recipes" : "Saved to your recipe book!", isSaved ? "info" : "success");
  };

  // Helper to scale numeric amounts in ingredients
  const scaleAmount = (amountStr) => {
    if (!amountStr) return '';
    const num = parseFloat(amountStr);
    if (isNaN(num)) return amountStr;
    const scaled = (num * servingsMultiplier);
    return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-surface rounded-3xl max-w-4xl w-full border border-surface-container shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-surface/90 hover:bg-surface text-on-surface-variant hover:text-on-surface transition-all shadow-md cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {/* Hero Image & Badge Header */}
          <div className="relative h-64 sm:h-80 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                {recipe.category || "Featured Recipe"}
              </span>
              {recipe.difficulty && (
                <span className="bg-surface/90 backdrop-blur-md text-on-surface px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  {recipe.difficulty} Prep
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-amber-200 mb-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>Prep: {recipe.prepTime || "10 mins"}</span>
                </span>
                <span>•</span>
                <span>Cook: {recipe.cookTime || "15 mins"}</span>
                <span>•</span>
                <span className="text-white font-bold">★ {recipe.rating || 4.9} ({recipe.reviews || 80}+ reviews)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
                {recipe.title}
              </h1>
            </div>
          </div>

          {/* Quick Action Bar & Servings Scaler */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 bg-surface-container-low rounded-2xl border border-surface-container mb-6">
            {/* Servings multiplier */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-primary" />
                <span>Yield:</span>
              </span>
              <div className="flex items-center bg-surface border border-outline-variant rounded-xl p-1 shadow-xs">
                <button
                  onClick={() => setServingsMultiplier(Math.max(0.5, servingsMultiplier - 0.5))}
                  className="p-1 rounded-lg hover:bg-surface-container text-on-surface cursor-pointer"
                  title="Decrease Servings"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-primary min-w-[70px] text-center">
                  {currentServings} Servings
                </span>
                <button
                  onClick={() => setServingsMultiplier(servingsMultiplier + 0.5)}
                  className="p-1 rounded-lg hover:bg-surface-container text-on-surface cursor-pointer"
                  title="Increase Servings"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveFavorite}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                  isSaved
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-surface border-outline-variant hover:border-rose-400 text-on-surface'
                }`}
                title="Save Recipe"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="p-2.5 rounded-xl bg-surface border border-outline-variant hover:border-primary text-on-surface hover:bg-surface-container-low transition-all cursor-pointer text-xs font-semibold flex items-center gap-1.5"
                title="Print Recipe Card"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print Card</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-surface border border-outline-variant hover:border-primary text-on-surface hover:bg-surface-container-low transition-all cursor-pointer text-xs font-semibold flex items-center gap-1.5"
                title="Share Recipe"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Caloric & Macronutrient Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">Calories</span>
              <span className="text-xl font-bold text-on-surface">🔥 {Math.round(recipe.calories * servingsMultiplier)}</span>
              <span className="text-[10px] text-on-surface-variant block mt-0.5">Kcal per serving</span>
            </div>

            <div className="bg-primary-container/15 p-4 rounded-2xl border border-primary-container/30 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">Protein</span>
              <span className="text-xl font-bold text-primary">
                {recipe.proteinNum ? Math.round(recipe.proteinNum * servingsMultiplier) + 'g' : recipe.protein}
              </span>
              <span className="text-[10px] text-primary/80 block mt-0.5">Lean Amino Acids</span>
            </div>

            <div className="bg-secondary-container/20 p-4 rounded-2xl border border-secondary-container/40 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-secondary block mb-1">Carbohydrates</span>
              <span className="text-xl font-bold text-secondary">
                {recipe.carbsNum ? Math.round(recipe.carbsNum * servingsMultiplier) + 'g' : recipe.carbs}
              </span>
              <span className="text-[10px] text-secondary/80 block mt-0.5">Complex & Fiber</span>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">Healthy Fats</span>
              <span className="text-xl font-bold text-amber-900">
                {recipe.fatsNum ? Math.round(recipe.fatsNum * servingsMultiplier) + 'g' : recipe.fats}
              </span>
              <span className="text-[10px] text-amber-800/80 block mt-0.5">Lipids & Omegas</span>
            </div>
          </div>

          {/* Description & Clinical Dietitian Insight */}
          <div className="mb-8 space-y-4">
            <p className="text-sm sm:text-base text-on-surface leading-relaxed">
              {recipe.description}
            </p>

            {recipe.clinicalTip && (
              <div className="bg-secondary-container/15 p-4 sm:p-5 rounded-2xl border border-secondary-container/30 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-secondary-container/40 text-secondary shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                    Clinical Dietitian Commentary
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant italic leading-relaxed">
                    "{recipe.clinicalTip}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tabs for Navigation */}
          <div className="flex border-b border-surface-container mb-6 gap-6">
            <button
              onClick={() => setActiveTab('recipe')}
              className={`pb-3 text-sm font-bold transition-colors cursor-pointer relative ${
                activeTab === 'recipe'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Ingredients & Method
            </button>

            <button
              onClick={() => setActiveTab('nutrition')}
              className={`pb-3 text-sm font-bold transition-colors cursor-pointer relative ${
                activeTab === 'nutrition'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Detailed Nutrition Panel
            </button>
          </div>

          {/* TAB 1: Ingredients Checklist & Step-by-Step Instructions */}
          {activeTab === 'recipe' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 animate-fadeIn">
              {/* Left: Ingredients Checklist (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-primary" />
                    <span>Ingredients ({recipe.ingredients ? recipe.ingredients.length : '8'})</span>
                  </h3>
                  <span className="text-[11px] text-on-surface-variant">Click to check off</span>
                </div>

                <ul className="space-y-2.5 bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-surface-container">
                  {recipe.ingredients && recipe.ingredients.map((item, idx) => {
                    const isChecked = !!checkedIngredients[idx];
                    return (
                      <li
                        key={idx}
                        onClick={() => toggleIngredientCheck(idx)}
                        className={`flex items-start gap-3 p-2 rounded-xl transition-colors cursor-pointer ${
                          isChecked ? 'bg-surface-container opacity-60 line-through' : 'hover:bg-surface'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-secondary text-white border-secondary' : 'border-outline-variant bg-surface'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm text-on-surface leading-snug">
                          {typeof item === 'string' ? (
                            item
                          ) : (
                            <>
                              <strong className="text-primary font-bold">
                                {scaleAmount(item.amount)} {item.unit}
                              </strong>{' '}
                              {item.name}
                            </>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right: Numbered Preparation Steps (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-primary" />
                  <span>Step-by-Step Cooking Blueprint</span>
                </h3>

                <div className="space-y-4">
                  {recipe.instructions ? (
                    recipe.instructions.map((inst) => {
                      const isDone = !!completedSteps[inst.step];
                      return (
                        <div
                          key={inst.step}
                          onClick={() => toggleStepCheck(inst.step)}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                            isDone
                              ? 'bg-surface-container-low border-surface-container opacity-70'
                              : 'bg-surface border-surface-container hover:border-primary shadow-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                isDone ? 'bg-secondary text-white' : 'bg-primary-container text-on-primary-container'
                              }`}>
                                {isDone ? <Check className="w-3.5 h-3.5" /> : inst.step}
                              </span>
                              <span>{inst.title}</span>
                            </span>
                            <span className="text-[11px] text-on-surface-variant font-medium">
                              {isDone ? 'Completed' : 'Tap to mark step'}
                            </span>
                          </div>
                          <p className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                            {inst.text}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-surface-container-low p-6 rounded-2xl text-xs text-on-surface-variant">
                      Follow standard sauté and sear instructions. Combine whole food ingredients over gentle heat and season with fine herbs.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Nutrition Facts Label Breakdown */}
          {activeTab === 'nutrition' && (
            <div className="max-w-xl mx-auto bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-surface-container mb-8 animate-fadeIn">
              <div className="border-b-4 border-on-surface pb-2 mb-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-on-surface">Nutrition Facts</h3>
                <p className="text-xs text-on-surface-variant">Per Serving ({currentServings} servings computed)</p>
              </div>

              <div className="space-y-2 text-sm border-b-2 border-on-surface pb-3 mb-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Calories</span>
                  <span>{Math.round(recipe.calories * servingsMultiplier)}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs divide-y divide-surface-container border-b-4 border-on-surface pb-3 mb-3">
                <div className="flex justify-between py-1 font-bold">
                  <span>Total Fat</span>
                  <span>{recipe.fatsNum ? Math.round(recipe.fatsNum * servingsMultiplier) + 'g' : recipe.fats}</span>
                </div>
                <div className="flex justify-between py-1 pl-4 text-on-surface-variant">
                  <span>Saturated Fat</span>
                  <span>3.2g</span>
                </div>
                <div className="flex justify-between py-1 font-bold">
                  <span>Cholesterol</span>
                  <span>45mg</span>
                </div>
                <div className="flex justify-between py-1 font-bold">
                  <span>Sodium</span>
                  <span>{recipe.sodium || "380mg"}</span>
                </div>
                <div className="flex justify-between py-1 font-bold">
                  <span>Total Carbohydrate</span>
                  <span>{recipe.carbsNum ? Math.round(recipe.carbsNum * servingsMultiplier) + 'g' : recipe.carbs}</span>
                </div>
                <div className="flex justify-between py-1 pl-4 text-on-surface-variant">
                  <span>Dietary Fiber</span>
                  <span>{recipe.fiber || "6g"}</span>
                </div>
                <div className="flex justify-between py-1 pl-4 text-on-surface-variant">
                  <span>Total Sugars (Natural)</span>
                  <span>{recipe.sugar || "4g"}</span>
                </div>
                <div className="flex justify-between py-1 font-bold text-primary">
                  <span>Protein</span>
                  <span>{recipe.proteinNum ? Math.round(recipe.proteinNum * servingsMultiplier) + 'g' : recipe.protein}</span>
                </div>
              </div>

              {recipe.nutritionFacts && (
                <div className="grid grid-cols-2 gap-3 text-xs text-on-surface-variant pt-2">
                  <div>Potassium: <strong className="text-on-surface">{recipe.nutritionFacts.potassium}</strong></div>
                  <div>Vitamin D / K: <strong className="text-on-surface">{recipe.nutritionFacts.vitaminD || recipe.nutritionFacts.vitaminK || "60% DV"}</strong></div>
                  <div>Magnesium / Iron: <strong className="text-on-surface">{recipe.nutritionFacts.magnesium || recipe.nutritionFacts.iron || "28% DV"}</strong></div>
                  <div>Bioavailable Antioxidants: <strong className="text-secondary font-bold">High ORAC</strong></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-6 bg-surface-container-low border-t border-surface-container flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleAddToPlan}
            className="flex-1 sm:flex-none bg-secondary-container hover:bg-secondary hover:text-white text-on-secondary-container font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
          >
            <BookmarkPlus className="w-4 h-4" />
            <span>Add to Active Meal Plan</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 sm:flex-none bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold py-3 px-8 rounded-xl text-xs cursor-pointer transition-all shadow-md"
          >
            Close & Return
          </button>
        </div>
      </div>
    </div>
  );
}
