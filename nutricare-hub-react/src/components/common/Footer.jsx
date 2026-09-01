import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { setCurrentPage } = useApp();

  return (
    <footer className="w-full py-12 bg-surface-container-lowest border-t border-surface-container mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 max-w-container-max mx-auto gap-6">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm">
            N
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-primary">
              NutriCare<span className="text-primary-container"> Hub</span>
            </span>
            <p className="text-[11px] text-on-surface-variant font-medium">Boutique Wellness Nutrition</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-on-surface-variant">
          <button 
            onClick={() => setCurrentPage('home')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('assessment')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Assessment Quiz
          </button>
          <button 
            onClick={() => setCurrentPage('diet-plan')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Personalized Plans
          </button>
          <button 
            onClick={() => setCurrentPage('recipes')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Recipes
          </button>
          <button 
            onClick={() => setCurrentPage('education')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Education
          </button>
          <button 
            onClick={() => setCurrentPage('nutritionist')}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Dietitians
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-on-surface-variant text-center md:text-right">
          <p>© 2026 NutriCare Hub. All rights reserved.</p>
          <p className="text-[11px] opacity-70 mt-0.5">Engineered with Boutique Wellness Aesthetics</p>
        </div>
      </div>
    </footer>
  );
}
