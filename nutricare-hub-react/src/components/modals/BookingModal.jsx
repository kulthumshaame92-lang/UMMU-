import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, ShieldCheck, CheckCircle2, CreditCard, Lock } from 'lucide-react';

export default function BookingModal() {
  const { isBookingModalOpen, closeBooking, selectedNutritionist, selectedTier, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@wellness.io',
    phone: '+1 (555) 234-8901',
    goal: 'Metabolic Longevity & Satiety',
    cardNum: '•••• •••• •••• 4242'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isBookingModalOpen) return null;

  const currentTier = selectedTier || (selectedNutritionist.consultationTiers && selectedNutritionist.consultationTiers[0]) || {
    name: "Initial Comprehensive Assessment",
    price: "$180",
    duration: "60 mins"
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      showToast("Consultation booked and confirmed! Check your email for calendar invite.", "success");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-surface-container shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsConfirmed(false);
            closeBooking();
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <Calendar className="w-4 h-4" />
              <span>Consultation Booking</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-4">
              Confirm Your Session
            </h2>

            {/* Dietitian & Tier Summary Box */}
            <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container mb-6 flex items-center gap-4">
              <img
                src={selectedNutritionist.avatar}
                alt={selectedNutritionist.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary-container"
              />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-on-surface">{selectedNutritionist.name}</h4>
                <p className="text-xs text-on-surface-variant">{currentTier.name}</p>
                <div className="flex items-center gap-3 text-xs font-bold text-primary mt-1">
                  <span>{currentTier.duration}</span>
                  <span>•</span>
                  <span>{currentTier.price}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                  Primary Focus for Session
                </label>
                <input
                  type="text"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                />
              </div>

              {/* Secure Payment simulation */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-on-surface mb-1.5">
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5 text-secondary" /> Payment Method
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-on-surface-variant font-normal">
                    <Lock className="w-3 h-3 text-secondary" /> 256-bit Encrypted
                  </span>
                </div>
                <div className="bg-surface-container p-3 rounded-xl border border-surface-container flex items-center justify-between">
                  <span className="text-xs font-medium text-on-surface font-mono">
                    VISA {formData.cardNum}
                  </span>
                  <span className="text-[11px] text-secondary font-bold">Verified</span>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-container flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>
                      <span>Confirming Appointment...</span>
                    </>
                  ) : (
                    <span>Complete Booking ({currentTier.price})</span>
                  )}
                </button>

                <p className="text-[11px] text-center text-on-surface-variant">
                  🔒 HIPAA Compliant Telehealth • Free Cancellation within 24h
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-secondary-container/50 text-secondary flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-on-surface mb-2">
              Appointment Confirmed!
            </h2>
            <p className="text-sm text-on-surface-variant max-w-sm mx-auto mb-6">
              Your consultation with <span className="font-bold text-on-surface">{selectedNutritionist.name}</span> has been confirmed. A Google Meet link and intake checklist have been sent to <span className="font-medium text-primary">{formData.email}</span>.
            </p>

            <button
              onClick={() => {
                setIsConfirmed(false);
                closeBooking();
              }}
              className="bg-primary text-white font-bold py-3 px-8 rounded-xl text-sm hover:bg-amber-950 transition-all cursor-pointer"
            >
              Done & Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
