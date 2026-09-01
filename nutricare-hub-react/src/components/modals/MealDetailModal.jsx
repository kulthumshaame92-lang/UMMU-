import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Clock, Flame, Sparkles, RefreshCw, Check, Utensils, Heart } from 'lucide-react';

export default function MealDetailModal({ meal, onClose, onSwap }) {
  const { showToast } = useApp();
  const [isSwapped, setIsSwapped] = useState(false);

  if (!meal) return null;

  const handleSwapClick = () => {
    setIsSwapped(true);
    showToast(`Swapped ${meal.type} to low-glycemic alternative!`, 'success');
    if (onSwap) {
      onSwap(meal.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-surface-container shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Meal Image */}
        <div className="h-56 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden relative">
          <img
            src={meal.image}
            alt={meal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-6 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-bold text-on-surface shadow-md">
            {meal.type} • {meal.time}
          </div>
        </div>

        {/* Title and Macros */}
        <h2 className="text-2xl font-bold text-on-surface mb-2">
          {meal.title}
        </h2>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-surface-container text-on-surface text-xs font-bold rounded-lg">
            🔥 {meal.calories} Kcal
          </span>
          <span className="px-3 py-1 bg-primary-container/20 text-primary text-xs font-bold rounded-lg">
            {meal.protein}g Protein
          </span>
          <span className="px-3 py-1 bg-secondary-container/30 text-secondary text-xs font-bold rounded-lg">
            {meal.carbs}g Carbs
          </span>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg">
            {meal.fats}g Healthy Fats
          </span>
          {meal.fiber && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
              {meal.fiber}g Fiber
            </span>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface mb-3 flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-primary" />
            <span>Organic Ingredients</span>
          </h3>
          <ul className="space-y-1.5 bg-surface-container-low p-4 rounded-xl border border-surface-container text-xs sm:text-sm text-on-surface-variant">
            {meal.ingredients ? (
              meal.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{ing}</span>
                </li>
              ))
            ) : (
              <li>Customized nutrient-dense whole foods selected for this protocol.</li>
            )}
          </ul>
        </div>

        {/* Dietitian Clinical Tip */}
        {meal.tips && (
          <div className="mb-6 bg-secondary-container/15 p-4 rounded-xl border border-secondary-container/30">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Clinical Dietitian Tip
            </h4>
            <p className="text-xs text-on-surface-variant italic">
              "{meal.tips}"
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-surface-container">
          <button
            onClick={handleSwapClick}
            className="flex-1 bg-surface-container hover:bg-surface-variant text-on-surface font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RefreshCw className="w-4 h-4 text-primary" />
            <span>Swap For Alternative Dish</span>
          </button>

          <button
            onClick={onClose}
            className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold py-3 px-6 rounded-xl text-xs cursor-pointer transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
