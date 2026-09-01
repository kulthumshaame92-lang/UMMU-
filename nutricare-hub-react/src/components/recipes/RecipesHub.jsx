import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RECIPES_DATA } from '../../data/recipesData';
import { Search, Filter, Sparkles, Star, Clock, Utensils, Heart, ChevronRight } from 'lucide-react';

export default function RecipesHub({ onSelectRecipe }) {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([1]);

  const categories = ['All', 'High Protein', 'Plant-Based', 'Breakfast', 'Anti-Inflammatory', 'Quick Prep'];

  const filteredRecipes = RECIPES_DATA.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedCategory === 'All') return matchesSearch;
    return matchesSearch && (recipe.category === selectedCategory || recipe.tags.includes(selectedCategory));
  });

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
      showToast("Removed from favorite recipes", "info");
    } else {
      setFavorites([...favorites, id]);
      showToast("Added to favorite recipes!", "success");
    }
  };

  return (
    <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-semibold text-xs uppercase tracking-wider mb-4 border border-secondary-container/40">
          <Utensils className="w-3.5 h-3.5 text-secondary" />
          <span>Curated Culinary Blueprints</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-on-surface mb-3">
          NutriCare Recipe Hub
        </h1>
        <p className="text-base text-on-surface-variant">
          Explore delicious, nutrient-dense culinary blueprints tailored for metabolic vitality and high satiety.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, ingredients, or tags..."
            className="w-full bg-surface border border-outline-variant rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary-container text-on-primary-container shadow-xs font-bold'
                  : 'bg-surface border border-surface-container hover:bg-surface-container-low text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => {
          const isFav = favorites.includes(recipe.id);
          return (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe && onSelectRecipe(recipe)}
              className="glass-card rounded-2xl overflow-hidden border border-surface-container hover-lift cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <button
                    onClick={(e) => toggleFavorite(recipe.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-surface/90 backdrop-blur-md hover:bg-surface text-rose-500 shadow-sm transition-transform active:scale-90 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-on-surface-variant'}`} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-surface/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-on-surface flex items-center gap-1 shadow-xs">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{recipe.prepTime}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                      {recipe.category}
                    </span>
                    <span className="flex items-center text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {recipe.rating} ({recipe.reviews})
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-on-surface mb-2 line-clamp-1">
                    {recipe.title}
                  </h3>

                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">
                    {recipe.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {recipe.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] font-semibold rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Macro Bar Footer */}
              <div className="px-5 py-3.5 bg-surface-container-low border-t border-surface-container flex items-center justify-between text-xs font-bold">
                <span className="text-on-surface">🔥 {recipe.calories} Kcal</span>
                <span className="text-primary">{recipe.protein} P</span>
                <span className="text-secondary">{recipe.carbs} C</span>
                <span className="text-amber-700">{recipe.fats} F</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
