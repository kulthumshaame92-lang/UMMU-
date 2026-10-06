import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NUTRITIONISTS } from '../../data/nutritionistsData';
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  Sparkles, 
  Video, 
  Upload, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  FileText, 
  AlertCircle,
  Download,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function BookConsultationPage() {
  const { 
    selectedNutritionist, 
    setSelectedNutritionist, 
    selectedTier, 
    setSelectedTier,
    showToast,
    setCurrentPage
  } = useApp();

  const [activeStep, setActiveStep] = useState(1); // 1: Tier & Specialist, 2: Schedule & Format, 3: Full Clinical Intake Form, 4: Review & Payment
  const [selectedNutritionistId, setSelectedNutritionistId] = useState(selectedNutritionist?.id || NUTRITIONISTS[0].id);
  const currentNutritionist = NUTRITIONISTS.find(n => n.id === selectedNutritionistId) || NUTRITIONISTS[0];

  const defaultTier = currentNutritionist.consultationTiers?.[0] || {
    id: "initial-eval",
    name: "Initial Comprehensive Assessment",
    duration: "60 mins",
    price: "$180",
    features: ["Complete metabolic & dietary history analysis", "Biomarker review", "Custom 7-day starter plan"]
  };

  const [chosenTier, setChosenTier] = useState(selectedTier || defaultTier);

  // Date and Time selection
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [selectedDate, setSelectedDate] = useState('Tue, Oct 15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:30 AM');
  const [sessionFormat, setSessionFormat] = useState('video'); // 'video', 'phone'

  // Full Clinical Intake Form fields
  const [formData, setFormData] = useState({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@wellness.io',
    phone: '+1 (555) 234-8901',
    dateOfBirth: '1995-06-14',
    gender: 'female',
    height: '172 cm',
    currentWeight: '64 kg',
    targetWeight: '60 kg',
    timezone: 'PST (Pacific Standard Time, UTC-8)',
    dietaryPreference: 'Mediterranean / Whole Food',
    allergies: 'Gluten sensitivity, mild lactose intolerance',
    currentMedications: 'Vitamin D3 (2000 IU), Magnesium Glycinate',
    primaryGoal: 'Sustained daily energy, gut microbiome healing, and lean body recomposition without calorie exhaustion.',
    topOutcomes: '1. Overcome 3pm energy slump\n2. Eliminate post-meal bloating\n3. High-protein meal blueprint for active lifestyle',
    dailyStressLevel: 'Moderate (6/10)',
    sleepQuality: '7 hours / Night (occasional wakeups)',
    uploadedFiles: ['Recent_Bloodwork_Metabolic_Panel_2026.pdf'],
    cardName: 'Alex Morgan',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/29',
    cardCvc: '•••',
    insuranceReceiptNeeded: true,
    agreedToTerms: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const availableDates = [
    { label: 'Mon, Oct 14', dayName: 'Mon', dayNum: 14, slots: ['09:00 AM', '02:00 PM', '04:30 PM'] },
    { label: 'Tue, Oct 15', dayName: 'Tue', dayNum: 15, slots: ['10:30 AM', '01:00 PM', '03:30 PM', '05:00 PM'] },
    { label: 'Wed, Oct 16', dayName: 'Wed', dayNum: 16, slots: ['09:30 AM', '11:00 AM', '02:30 PM'] },
    { label: 'Thu, Oct 17', dayName: 'Thu', dayNum: 17, slots: [] }, // booked
    { label: 'Fri, Oct 18', dayName: 'Fri', dayNum: 18, slots: ['10:00 AM', '01:30 PM', '04:00 PM'] },
    { label: 'Sat, Oct 19', dayName: 'Sat', dayNum: 19, slots: ['11:00 AM', '01:00 PM'] },
  ];

  const currentDateObj = availableDates.find(d => d.label === selectedDate) || availableDates[1];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNutritionistChange = (n) => {
    setSelectedNutritionistId(n.id);
    setSelectedNutritionist(n);
    if (n.consultationTiers && n.consultationTiers.length > 0) {
      setChosenTier(n.consultationTiers[0]);
    }
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const randomCode = 'NC-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(randomCode);
      setIsSubmitting(false);
      setIsBookingConfirmed(true);
      showToast(`Consultation successfully booked! Confirmation #${randomCode}`, 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleDownloadCalendar = () => {
    showToast("Downloaded .ICS calendar invite to your device", "success");
  };

  if (isBookingConfirmed) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
        <div className="bg-surface rounded-3xl p-8 sm:p-12 border border-surface-container shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-primary via-amber-500 to-secondary" />

          <div className="w-20 h-20 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center mx-auto mb-6 ring-8 ring-secondary-container/20">
            <CheckCircle2 className="w-12 h-12 text-secondary" />
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container/30 text-secondary text-xs font-bold uppercase tracking-wider mb-3">
            Appointment Confirmed • Ref #{confirmationCode}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-on-surface mb-3">
            You're All Set for Your Consultation!
          </h1>
          
          <p className="text-base text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
            A confirmation email with calendar invites and video conference link has been dispatched to <span className="font-semibold text-primary">{formData.email}</span>.
          </p>

          {/* Appointment Breakdown Card */}
          <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-surface-container max-w-2xl mx-auto mb-8 text-left grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentNutritionist.avatar}
                alt={currentNutritionist.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary-container shrink-0"
              />
              <div>
                <h3 className="text-base font-bold text-on-surface">{currentNutritionist.name}</h3>
                <p className="text-xs text-on-surface-variant">{currentNutritionist.title}</p>
                <span className="inline-block mt-1 text-[11px] font-bold text-secondary">Board Certified RD</span>
              </div>
            </div>

            <div className="space-y-2 border-t md:border-t-0 md:border-l border-surface-container pt-4 md:pt-0 md:pl-6 text-sm">
              <div className="flex items-center gap-2 text-on-surface font-semibold">
                <Calendar className="w-4 h-4 text-primary shrink-0" />
                <span>{selectedDate}, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface font-semibold">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>{selectedTimeSlot} ({chosenTier.duration})</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                <Video className="w-4 h-4 text-secondary shrink-0" />
                <span>Google Meet HD Video (Encrypted)</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleDownloadCalendar}
              className="bg-surface border border-outline-variant hover:border-primary text-on-surface font-semibold px-6 py-3.5 rounded-xl text-sm shadow-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Add to Google / Apple Calendar (.ics)</span>
            </button>

            <button
              onClick={() => setCurrentPage('diet-plan')}
              className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold px-8 py-3.5 rounded-xl text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>View Your Dashboard & Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/20 text-on-primary-container font-semibold text-xs uppercase tracking-wider mb-4 border border-primary-container/30">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>Full Clinical Telehealth Form</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface mb-3">
          Book Your 1-on-1 Consultation
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant">
          Complete the intake form below to schedule your personalized session with our board-certified dietitians.
        </p>
      </div>

      {/* Progress Step Navigation */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
          {[
            { step: 1, label: "Specialist & Tier" },
            { step: 2, label: "Time & Schedule" },
            { step: 3, label: "Clinical Intake" },
            { step: 4, label: "Confirm & Pay" }
          ].map((s) => {
            const isDone = activeStep > s.step;
            const isCurrent = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`flex flex-col items-center text-center p-2 sm:p-3 rounded-xl transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-primary-container/20 border-b-2 border-primary font-bold text-primary'
                    : isDone
                    ? 'text-secondary font-semibold hover:bg-surface-container-low'
                    : 'text-on-surface-variant/60 hover:text-on-surface'
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-1 font-bold ${
                  isCurrent
                    ? 'bg-primary text-white shadow-xs'
                    : isDone
                    ? 'bg-secondary text-white'
                    : 'bg-surface-container text-on-surface-variant'
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                </span>
                <span className="text-[11px] sm:text-xs hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Full Form Card */}
      <div className="max-w-4xl mx-auto">
        {/* STEP 1: Specialist & Tier Selection */}
        {activeStep === 1 && (
          <div className="bg-surface rounded-3xl p-6 sm:p-10 border border-surface-container shadow-xl animate-fadeIn space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-on-surface mb-2">
                1. Select Your Certified Nutrition Specialist
              </h2>
              <p className="text-sm text-on-surface-variant">
                All our clinicians hold advanced clinical degrees, board registrations, and specialized functional medicine training.
              </p>
            </div>

            {/* Nutritionist Picker Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NUTRITIONISTS.map((nutri) => {
                const isSelected = selectedNutritionistId === nutri.id;
                return (
                  <div
                    key={nutri.id}
                    onClick={() => handleNutritionistChange(nutri)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-primary-container/10 border-primary ring-2 ring-primary/30 shadow-md'
                        : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                    }`}
                  >
                    <img
                      src={nutri.avatar}
                      alt={nutri.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary-container shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h3 className="text-base font-bold text-on-surface truncate">{nutri.name}</h3>
                        <span className="text-xs font-bold text-amber-500 shrink-0">★ {nutri.rating}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mb-2">{nutri.title}</p>
                      <div className="flex flex-wrap gap-1">
                        {nutri.specialties.slice(0, 2).map((sp, idx) => (
                          <span key={idx} className="text-[10px] bg-secondary-container/40 text-secondary px-2 py-0.5 rounded font-medium">
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tier / Package Options */}
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-4">
                Choose Consultation Package
              </h3>
              <div className="space-y-3">
                {currentNutritionist.consultationTiers.map((tier) => {
                  const isChosen = chosenTier.name === tier.name;
                  return (
                    <div
                      key={tier.id || tier.name}
                      onClick={() => setChosenTier(tier)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isChosen
                          ? 'bg-primary-container/15 border-primary ring-2 ring-primary/30 shadow-md'
                          : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-on-surface">{tier.name}</h4>
                          {tier.badge && (
                            <span className="bg-primary text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>{tier.duration} 1-on-1 Consultation</span>
                          <span>•</span>
                          <span className="text-secondary font-medium">Video / Telehealth</span>
                        </div>
                        <ul className="text-xs text-on-surface-variant pt-2 space-y-1">
                          {tier.features.slice(0, 3).map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-right sm:text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                        <span className="text-2xl font-bold text-primary">{tier.price}</span>
                        <p className="text-[11px] text-on-surface-variant">HSA/FSA Eligible</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-surface-container">
              <button
                onClick={() => setActiveStep(2)}
                className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold px-8 py-3.5 rounded-xl text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Continue to Date & Time</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Interactive Scheduling & Video Format */}
        {activeStep === 2 && (
          <div className="bg-surface rounded-3xl p-6 sm:p-10 border border-surface-container shadow-xl animate-fadeIn space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-on-surface mb-2">
                2. Select Date & Consultation Format
              </h2>
              <p className="text-sm text-on-surface-variant">
                Consulting with <span className="font-bold text-on-surface">{currentNutritionist.name}</span> for {chosenTier.name} ({chosenTier.duration}).
              </p>
            </div>

            {/* Format Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSessionFormat('video')}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                  sessionFormat === 'video'
                    ? 'bg-primary-container/15 border-primary ring-2 ring-primary/20'
                    : 'bg-surface-container-low border-surface-container'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-container/30 text-primary flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Encrypted HD Video Call</h4>
                  <p className="text-xs text-on-surface-variant">Google Meet link provided with screen share</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSessionFormat('phone')}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                  sessionFormat === 'phone'
                    ? 'bg-primary-container/15 border-primary ring-2 ring-primary/20'
                    : 'bg-surface-container-low border-surface-container'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Direct Telehealth Phone</h4>
                  <p className="text-xs text-on-surface-variant">Clinician calls your direct telephone number</p>
                </div>
              </button>
            </div>

            {/* Interactive Date Row */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface">
                  Available Dates ({selectedMonth})
                </h3>
                <span className="text-xs text-on-surface-variant font-medium">Timezone: {formData.timezone.split(' ')[0]}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {availableDates.map((d) => {
                  const isSelected = selectedDate === d.label;
                  const isAvailable = d.slots.length > 0;
                  return (
                    <button
                      key={d.label}
                      disabled={!isAvailable}
                      onClick={() => {
                        setSelectedDate(d.label);
                        if (d.slots.length > 0) setSelectedTimeSlot(d.slots[0]);
                      }}
                      className={`py-3 px-2 rounded-xl flex flex-col items-center border transition-all cursor-pointer ${
                        !isAvailable
                          ? 'opacity-40 cursor-not-allowed bg-surface-container-low border-surface-container'
                          : isSelected
                          ? 'bg-primary-container text-on-primary-container font-bold shadow-md ring-2 ring-primary-container'
                          : 'bg-surface border-surface-container hover:border-primary text-on-surface'
                      }`}
                    >
                      <span className="text-[11px] uppercase tracking-wider opacity-80">{d.dayName}</span>
                      <span className="text-lg font-bold my-0.5">{d.dayNum}</span>
                      <span className="text-[10px] font-medium">{isAvailable ? `${d.slots.length} slots` : 'Full'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selector */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface mb-3">
                Available Time Slots for {selectedDate}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentDateObj.slots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border cursor-pointer text-center ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/20'
                          : 'bg-surface border-surface-container hover:border-primary text-on-surface'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-surface-container">
              <button
                onClick={() => setActiveStep(1)}
                className="px-6 py-3 rounded-xl border border-outline-variant text-on-surface font-semibold text-xs hover:bg-surface-container-low transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setActiveStep(3)}
                className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold px-8 py-3.5 rounded-xl text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Continue to Clinical Intake Form</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Complete Clinical Intake Form (Full Form) */}
        {activeStep === 3 && (
          <div className="bg-surface rounded-3xl p-6 sm:p-10 border border-surface-container shadow-xl animate-fadeIn space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Confidential & HIPAA Compliant</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface mb-2">
                3. Complete Health & Clinical Intake Form
              </h2>
              <p className="text-sm text-on-surface-variant">
                Please provide accurate details so your dietitian can review your biomarkers and prepare a tailored protocol prior to your session.
              </p>
            </div>

            {/* Section A: Personal & Contact */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-surface-container pb-2">
                A. Personal & Contact Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Gender Identity
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none cursor-pointer"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non-binary">Non-Binary / Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section B: Biometrics & Metabolic Goals */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-surface-container pb-2">
                B. Biometrics & Primary Goals
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Current Height
                  </label>
                  <input
                    type="text"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="e.g. 172 cm or 5'8"
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Current Weight
                  </label>
                  <input
                    type="text"
                    value={formData.currentWeight}
                    onChange={(e) => handleInputChange('currentWeight', e.target.value)}
                    placeholder="e.g. 64 kg or 141 lbs"
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Target Weight / Goal
                  </label>
                  <input
                    type="text"
                    value={formData.targetWeight}
                    onChange={(e) => handleInputChange('targetWeight', e.target.value)}
                    placeholder="e.g. 60 kg or Maintain"
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                  Primary Health & Wellness Objective *
                </label>
                <textarea
                  rows={2}
                  value={formData.primaryGoal}
                  onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
                  placeholder="Describe what you would love to achieve through nutrition..."
                  className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                  Top 3 Outcomes Desired from this Consultation
                </label>
                <textarea
                  rows={3}
                  value={formData.topOutcomes}
                  onChange={(e) => handleInputChange('topOutcomes', e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                />
              </div>
            </div>

            {/* Section C: Dietary Preferences, Allergies & Medications */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-surface-container pb-2">
                C. Dietary Habits, Allergies & Clinical History
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Current Eating Style / Preference
                  </label>
                  <input
                    type="text"
                    value={formData.dietaryPreference}
                    onChange={(e) => handleInputChange('dietaryPreference', e.target.value)}
                    placeholder="e.g. Mediterranean, Vegetarian, Keto, Low-FODMAP"
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Known Allergies or Intolerances
                  </label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    placeholder="e.g. Gluten, Dairy, Peanuts, Shellfish"
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                  Current Supplements & Medications
                </label>
                <input
                  type="text"
                  value={formData.currentMedications}
                  onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                  placeholder="e.g. Multivitamin, Omega-3, Probiotics, Thyroid medication"
                  className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                />
              </div>

              {/* Lab Panel / Document Upload Simulation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                  Optional: Attach Bloodwork or Lab Panels (PDF/Image)
                </label>
                <div className="border-2 border-dashed border-surface-container hover:border-primary rounded-2xl p-4 text-center bg-surface-container-low transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  <p className="text-xs text-on-surface font-semibold">
                    Click to browse or drop medical PDF reports
                  </p>
                  <span className="text-[11px] text-on-surface-variant">
                    Attached: <span className="font-mono text-primary font-bold">{formData.uploadedFiles[0]}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-surface-container">
              <button
                onClick={() => setActiveStep(2)}
                className="px-6 py-3 rounded-xl border border-outline-variant text-on-surface font-semibold text-xs hover:bg-surface-container-low transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setActiveStep(4)}
                className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold px-8 py-3.5 rounded-xl text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Proceed to Review & Confirm</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Review, Payment & Instant Confirmation */}
        {activeStep === 4 && (
          <form onSubmit={handleCompleteBooking} className="bg-surface rounded-3xl p-6 sm:p-10 border border-surface-container shadow-xl animate-fadeIn space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-on-surface mb-2">
                4. Review & Confirm Booking
              </h2>
              <p className="text-sm text-on-surface-variant">
                Verify session details and complete your consultation reservation.
              </p>
            </div>

            {/* Session Summary Card */}
            <div className="bg-surface-container-low rounded-2xl p-6 border border-surface-container grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Dietitian & Service</span>
                <div className="flex items-center gap-3">
                  <img
                    src={currentNutritionist.avatar}
                    alt={currentNutritionist.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-container"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">{currentNutritionist.name}</h4>
                    <p className="text-xs text-primary font-semibold">{chosenTier.name}</p>
                  </div>
                </div>
                <div className="text-xs text-on-surface-variant space-y-1 pt-2">
                  <p>• Duration: <span className="font-semibold text-on-surface">{chosenTier.duration}</span></p>
                  <p>• Modality: <span className="font-semibold text-on-surface">{sessionFormat === 'video' ? 'Google Meet HD Video' : 'Phone Call'}</span></p>
                </div>
              </div>

              <div className="space-y-3 border-t md:border-t-0 md:border-l border-surface-container pt-4 md:pt-0 md:pl-6">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Appointment Schedule</span>
                <div className="text-sm font-bold text-on-surface space-y-1">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> {selectedDate}, 2026
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> {selectedTimeSlot}
                  </p>
                </div>
                <p className="text-xs text-on-surface-variant pt-2">
                  Client: <span className="font-semibold text-on-surface">{formData.fullName}</span> ({formData.email})
                </p>
              </div>
            </div>

            {/* Payment & Security Method */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-primary" /> Payment Method
                </h3>
                <span className="flex items-center gap-1 text-[11px] text-secondary font-bold">
                  <Lock className="w-3 h-3" /> 256-Bit Encrypted & HIPAA Safe
                </span>
              </div>

              <div className="bg-surface-container p-4 rounded-2xl border border-surface-container space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-on-surface">VISA ending in 4242</span>
                  <span className="text-xs font-bold text-secondary">Verified</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Your card will only be charged upon session confirmation. Itemized receipt for HSA/FSA reimbursement will be generated automatically.
                </p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-surface-container-low p-5 rounded-2xl border border-surface-container space-y-2 text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>{chosenTier.name} ({chosenTier.duration})</span>
                <span>{chosenTier.price}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant text-xs">
                <span>Telehealth HIPAA Platform & Lab Intake Fee</span>
                <span className="text-secondary font-bold">FREE ($0.00)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-on-surface pt-2 border-t border-surface-container">
                <span>Total Due Today</span>
                <span className="text-primary text-xl">{chosenTier.price}</span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex flex-col gap-3 pt-4 border-t border-surface-container">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={formData.agreedToTerms}
                  onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="agreeTerms" className="text-xs text-on-surface-variant">
                  I agree to the 24-hour telehealth cancellation policy and consent to confidential clinical care.
                </label>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-3 rounded-xl border border-outline-variant text-on-surface font-semibold text-xs hover:bg-surface-container-low transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold px-10 py-4 rounded-xl text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>
                      <span>Confirming Appointment & Sending Invites...</span>
                    </>
                  ) : (
                    <span>Complete Booking ({chosenTier.price})</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
