import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, X, Calendar, Sparkles, User, BookOpen, Utensils, Award } from 'lucide-react';

export default function Navbar() {
  const { currentPage, setCurrentPage, openBooking } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'assessment', label: 'Assessment', icon: User },
    { id: 'diet-plan', label: 'Personalized Plan', icon: Utensils },
    { id: 'nutritionist', label: 'Dietitians', icon: Award },
    { id: 'recipes', label: 'Recipes', icon: Utensils },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'booking', label: 'Book Consultation', icon: Calendar },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-surface/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-surface-container transition-all duration-300">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 max-w-container-max mx-auto h-20">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left flex items-center space-x-3 group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl font-bold">nutrition</span>
          </div>
          <div>
            <span className="font-display text-2xl font-bold tracking-tight text-primary">
              NutriCare<span className="text-primary-container"> Hub</span>
            </span>
            <span className="block text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant/70 -mt-1">
              Boutique Wellness Platform
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-primary bg-primary-container/15 font-bold shadow-xs border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action CTAs */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleNavClick('assessment')}
            className="hidden sm:inline-flex items-center text-sm font-semibold text-secondary hover:text-secondary-hover px-3 py-2 rounded-lg hover:bg-secondary-container/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 mr-1.5 text-secondary" />
            Free Quiz
          </button>

          <button
            onClick={() => setCurrentPage('booking')}
            className="hidden md:inline-flex items-center bg-primary-container hover:bg-amber-500 text-on-primary-container font-semibold px-5 py-2.5 rounded-full text-sm shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.35)] transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Consultation
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-surface-container px-4 pt-2 pb-6 space-y-2 animate-fadeIn shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left text-base font-medium transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}

          <div className="pt-4 border-t border-surface-container flex flex-col gap-3">
            <button
              onClick={() => {
                setCurrentPage('booking');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center bg-primary-container text-on-primary-container font-bold py-3 px-4 rounded-xl shadow-md"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Consultation Now
            </button>
            <button
              onClick={() => handleNavClick('assessment')}
              className="w-full flex items-center justify-center bg-surface-container text-primary font-semibold py-3 px-4 rounded-xl"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Nutrition Assessment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
