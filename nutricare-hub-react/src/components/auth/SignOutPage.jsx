import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LogOut, ShieldCheck, CheckCircle2, ArrowLeft, LogIn, User, Sparkles } from 'lucide-react';

export default function SignOutPage() {
  const { user, isAuthenticated, logout, setCurrentPage } = useApp();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleConfirmSignOut = () => {
    logout();
    setIsLoggedOut(true);
  };

  if (isLoggedOut || !isAuthenticated) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-16 animate-fadeIn text-center">
        <div className="bg-surface rounded-3xl p-8 sm:p-12 border border-surface-container shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center mx-auto mb-6 ring-8 ring-secondary-container/20">
            <CheckCircle2 className="w-12 h-12 text-secondary" />
          </div>

          <span className="inline-block px-4 py-1 rounded-full bg-secondary-container/30 text-secondary text-xs font-bold uppercase tracking-wider mb-3">
            Session Ended
          </span>

          <h1 className="text-3xl font-bold text-on-surface mb-3">
            You Have Signed Out
          </h1>

          <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
            Your clinical telehealth session has been securely closed. All cached medical notes and intake data remain 256-bit encrypted.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage('signin')}
              className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold px-7 py-3.5 rounded-xl text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In Again</span>
            </button>

            <button
              onClick={() => setCurrentPage('home')}
              className="bg-surface border border-outline-variant hover:border-primary text-on-surface font-semibold px-6 py-3.5 rounded-xl text-sm cursor-pointer transition-all shadow-xs"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-16 animate-fadeIn text-center">
      <div className="bg-surface rounded-3xl p-8 sm:p-12 border border-surface-container shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-6 ring-8 ring-rose-50">
          <LogOut className="w-10 h-10 text-rose-600" />
        </div>

        <span className="inline-block px-4 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3 border border-rose-200">
          Sign Out Confirmation
        </span>

        <h1 className="text-3xl font-bold text-on-surface mb-2">
          Sign Out of NutriCare Hub?
        </h1>

        <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
          You are currently signed in as <span className="font-bold text-on-surface">{user?.name || "Dr. Sarah Jenkins"}</span> (<span className="font-mono text-primary font-semibold">{user?.email || "admin@nutricarehub.com"}</span>).
        </p>

        {/* User Card */}
        <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container mb-8 flex items-center justify-between text-left max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1594824813627-c3773fb2a95c?auto=format&fit=crop&q=80&w=200"}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary-container"
            />
            <div>
              <h4 className="text-sm font-bold text-on-surface">{user?.name}</h4>
              <p className="text-xs text-on-surface-variant">{user?.email}</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 bg-primary-container text-on-primary-container rounded-full uppercase">
            {user?.role === 'admin' ? 'Administrator' : 'Client'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage(user?.role === 'admin' ? 'admin' : 'diet-plan')}
            className="w-full sm:w-auto bg-surface border border-outline-variant hover:border-primary text-on-surface font-semibold px-6 py-3.5 rounded-xl text-sm cursor-pointer transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Stay Signed In</span>
          </button>

          <button
            onClick={handleConfirmSignOut}
            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Confirm Sign Out</span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-surface-container text-xs text-on-surface-variant flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <span>Secure HIPAA Telehealth Session Termination</span>
        </div>
      </div>
    </div>
  );
}
