import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Star, 
  Calendar, 
  Mail, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Sparkles, 
  Heart, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export default function NutritionistProfile() {
  const { selectedNutritionist, setSelectedTier, setCurrentPage, showToast } = useApp();
  
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);

  const dates = [
    { day: 'Mon', num: 14, available: true },
    { day: 'Tue', num: 15, available: true },
    { day: 'Wed', num: 16, available: true },
    { day: 'Thu', num: 17, available: false },
    { day: 'Fri', num: 18, available: true },
    { day: 'Sat', num: 19, available: true },
  ];

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '01:00 PM',
    '03:00 PM',
    '04:30 PM'
  ];

  const handleBookingConfirm = () => {
    const tier = selectedNutritionist.consultationTiers[selectedTierIndex];
    setSelectedTier(tier);
    setCurrentPage('booking');
  };

  const handleMessage = () => {
    showToast(`Direct message thread opened with ${selectedNutritionist.name}`, 'info');
  };

  return (
    <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      {/* Hero Profile Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-center">
        {/* Dietitian Image Column with Trust Badge */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-ambient-md border border-surface-container relative">
            <img
              src={selectedNutritionist.avatar || "https://images.unsplash.com/photo-1594824813627-c3773fb2a95c?auto=format&fit=crop&q=80&w=400"}
              alt={selectedNutritionist.name}
              className="w-full h-full object-cover"
            />
            {/* Trust Badge Overlay */}
            <div className="absolute bottom-4 right-4 bg-surface/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md flex items-center gap-2 border border-surface-container">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span className="text-xs font-bold text-on-surface">Board Certified RD</span>
            </div>
          </div>
        </div>

        {/* Bio & Details Column */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="bg-secondary-container/30 text-on-secondary-container text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-secondary-container/40">
              Clinical Dietitian
            </span>
            <span className="flex items-center text-amber-500 text-xs font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 mr-1 fill-amber-400" />
              {selectedNutritionist.rating} ({selectedNutritionist.reviewCount} Reviews)
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              • {selectedNutritionist.experience} Experience
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface mb-4">
            {selectedNutritionist.name}
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant mb-6 leading-relaxed">
            {selectedNutritionist.about}
          </p>

          {/* Specialties Chips */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
              Clinical Specialties & Focus Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedNutritionist.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="bg-[#10B981]/10 text-[#006c49] text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-[#10B981]/25"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Direct Actions */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => {
                setSelectedTier(selectedNutritionist.consultationTiers[0]);
                setCurrentPage('booking');
              }}
              className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-semibold px-7 py-3.5 rounded-xl text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Full Consultation</span>
            </button>

            <button
              onClick={handleMessage}
              className="border border-outline-variant hover:border-primary text-on-surface font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-surface-container-low transition-all flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-primary" />
              <span>Send Direct Message</span>
            </button>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Philosophy, Credentials & Booking Widget */}
      <section id="booking-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left Column: Approach & Certifications */}
        <div className="lg:col-span-7 space-y-8">
          {/* Philosophy Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-surface-container shadow-ambient-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-secondary-container/30 text-secondary flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-on-surface">Clinical Philosophy</h2>
            </div>
            <p className="text-on-surface-variant text-base leading-relaxed mb-4">
              I believe that food should be a source of sustained joy and vitality, never stress or extreme restriction. My clinical approach integrates modern biochemical research with human habit systems to craft nutrition plans that are effective and genuinely sustainable for years.
            </p>
            <p className="text-on-surface-variant text-base leading-relaxed">
              Every metabolic blueprint is unique. We work collaboratively to uncover the root causes of energy slumps, inflammation, or digestive imbalances—designing an exact nutritional roadmap that fits seamlessly into your daily rhythm.
            </p>
          </div>

          {/* Credentials & Affiliations Bento */}
          <div>
            <h2 className="text-xl font-bold text-on-surface mb-4">
              Credentials & Affiliations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedNutritionist.credentials.map((cred, idx) => (
                <div 
                  key={idx} 
                  className="bg-surface-container-low p-4 rounded-xl border border-surface-container flex items-start gap-3.5"
                >
                  <div className="p-2 rounded-lg bg-secondary-container/40 text-secondary shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">{cred.degree}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">{cred.institution}</p>
                  </div>
                </div>
              ))}
              
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-primary-container/30 text-primary shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Certified Diabetes Care Specialist</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">CBDCE National Board</p>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Tiers Selector */}
          <div>
            <h2 className="text-xl font-bold text-on-surface mb-4">
              Consultation Options
            </h2>
            <div className="space-y-3">
              {selectedNutritionist.consultationTiers.map((tier, idx) => {
                const isSelected = selectedTierIndex === idx;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierIndex(idx)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-primary-container/10 border-primary ring-2 ring-primary/20 shadow-xs'
                        : 'bg-surface border-surface-container hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-on-surface">{tier.name}</h4>
                          {tier.badge && (
                            <span className="bg-primary-container text-on-primary-container text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium flex items-center gap-1.5 mt-1">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          {tier.duration}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-primary">{tier.price}</span>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-3 pt-3 border-t border-surface-container text-xs text-on-surface-variant">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Booking Widget */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 sm:p-7 rounded-2xl border border-surface-container shadow-ambient-md sticky top-28">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-on-surface">Select Appointment Time</h3>
                <p className="text-xs text-on-surface-variant">
                  {selectedNutritionist.consultationTiers[selectedTierIndex].name} ({selectedNutritionist.consultationTiers[selectedTierIndex].price})
                </p>
              </div>
            </div>

            {/* Month Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-surface-container">
              <button className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-on-surface">{selectedMonth}</span>
              <button className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Date Row */}
            <div className="flex justify-between gap-2 mb-6 overflow-x-auto pb-2">
              {dates.map((d) => {
                const isSelected = selectedDate === d.num;
                return (
                  <button
                    key={d.num}
                    disabled={!d.available}
                    onClick={() => setSelectedDate(d.num)}
                    className={`flex flex-col items-center py-2.5 px-3 rounded-xl min-w-[54px] transition-all cursor-pointer ${
                      !d.available
                        ? 'opacity-40 cursor-not-allowed border border-surface-container'
                        : isSelected
                        ? 'bg-primary-container text-on-primary-container font-bold shadow-xs ring-2 ring-primary-container'
                        : 'bg-surface border border-outline-variant hover:border-primary text-on-surface'
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-wider mb-0.5 opacity-80">{d.day}</span>
                    <span className="text-base font-bold">{d.num}</span>
                  </button>
                );
              })}
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface mb-3">
                Available Slots for Tue, Oct {selectedDate}
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer text-center ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-surface border-surface-container hover:border-primary text-on-surface'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Confirm CTA */}
            <button
              onClick={handleBookingConfirm}
              className="w-full bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Continue in Full Intake Form ({selectedTime})</span>
            </button>

            <p className="text-[11px] text-center text-on-surface-variant mt-3">
              🔒 Free cancellation up to 24 hours before consultation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
