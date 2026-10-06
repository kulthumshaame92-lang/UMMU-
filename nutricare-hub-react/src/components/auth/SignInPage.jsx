import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, 
  Mail, 
  Key, 
  ShieldCheck, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  LogOut, 
  CheckCircle2, 
  LayoutDashboard, 
  Award,
  AlertCircle
} from 'lucide-react';

export default function SignInPage() {
  const { user, isAuthenticated, login, logout, setCurrentPage, showToast } = useApp();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@nutricarehub.com');
  const [password, setPassword] = useState('admin123');
  const [name, setName] = useState('Dr. Sarah Jenkins');
  const [role, setRole] = useState('admin'); // 'admin', 'client'
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email.trim() && password.trim()) {
        const detectedRole = email.toLowerCase().includes('admin') || role === 'admin' ? 'admin' : 'client';
        login({
          name: name || (detectedRole === 'admin' ? 'Dr. Sarah Jenkins' : 'Alex Morgan'),
          email: email.trim(),
          role: detectedRole,
          avatar: detectedRole === 'admin' 
            ? 'https://images.unsplash.com/photo-1594824813627-c3773fb2a95c?auto=format&fit=crop&q=80&w=400' 
            : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
        });
      } else {
        setErrorMsg('Please enter a valid email and password.');
      }
    }, 800);
  };

  const handleDemoFill = (type) => {
    setErrorMsg('');
    if (type === 'admin') {
      setEmail('admin@nutricarehub.com');
      setPassword('admin123');
      setName('Dr. Sarah Jenkins, RD');
      setRole('admin');
    } else {
      setEmail('alex.morgan@wellness.io');
      setPassword('client123');
      setName('Alex Morgan');
      setRole('client');
    }
  };

  // If already logged in, show user session & Sign Out screen
  if (isAuthenticated && user) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 animate-fadeIn">
        <div className="bg-surface rounded-3xl p-8 sm:p-10 border border-surface-container shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-primary via-amber-500 to-secondary" />

          {/* User Avatar */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img
              src={user.avatar || "https://images.unsplash.com/photo-1594824813627-c3773fb2a95c?auto=format&fit=crop&q=80&w=400"}
              alt={user.name}
              className="w-full h-full rounded-full object-cover border-4 border-primary-container shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs shadow-xs">
              ✓
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary-container/40 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Active Session • {user.role === 'admin' ? 'Administrator / Lead Clinician' : 'Client Member'}</span>
          </div>

          <h1 className="text-3xl font-bold text-on-surface mb-1">
            Welcome, {user.name}
          </h1>
          <p className="text-sm text-on-surface-variant mb-8">
            Signed in with <span className="font-mono font-bold text-primary">{user.email}</span>
          </p>

          {/* Session Cards & Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
            {user.role === 'admin' && (
              <button
                onClick={() => setCurrentPage('admin')}
                className="p-5 rounded-2xl bg-primary-container/15 hover:bg-primary-container/25 border border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-on-surface text-base">Admin Dashboard</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Manage consultations, client intakes, recipe blueprints, and clinical logs.
                </p>
              </button>
            )}

            <button
              onClick={() => setCurrentPage('diet-plan')}
              className="p-5 rounded-2xl bg-secondary-container/20 hover:bg-secondary-container/30 border border-secondary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-on-surface text-base">Personalized Plan</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                View active nutrition targets, daily meals, hydration logs, and recipes.
              </p>
            </button>

            {user.role !== 'admin' && (
              <button
                onClick={() => setCurrentPage('booking')}
                className="p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-surface-container transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-800 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-bold text-on-surface text-base">Book 1-on-1 Session</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Schedule video consultation with your certified dietician.
                </p>
              </button>
            )}
          </div>

          {/* Sign Out Action Button */}
          <div className="pt-6 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>HIPAA Encrypted 256-bit Session</span>
            </span>

            <button
              onClick={logout}
              className="w-full sm:w-auto bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out from NutriCare</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Sign In Form View
  return (
    <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <div className="max-w-md mx-auto">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <span className="material-symbols-outlined text-2xl font-bold">lock</span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">
            {isSignUp ? 'Create Your Account' : 'Sign In to NutriCare'}
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            {isSignUp
              ? 'Join our boutique wellness platform for tailored nutrition blueprints.'
              : 'Access your clinical portal, diet plan, and admin console.'}
          </p>
        </div>

        {/* Quick Demo Credentials Banner */}
        <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Login
            </span>
            <span className="text-[10px] text-on-surface-variant">Click to auto-fill</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="py-2 px-3 rounded-xl bg-primary-container/20 hover:bg-primary-container/30 border border-primary-container/40 text-primary text-xs font-bold cursor-pointer transition-all text-center"
            >
              👑 Admin Portal
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('client')}
              className="py-2 px-3 rounded-xl bg-secondary-container/30 hover:bg-secondary-container/40 border border-secondary-container/50 text-secondary text-xs font-bold cursor-pointer transition-all text-center"
            >
              👤 Client Account
            </button>
          </div>
        </div>

        {/* Main Auth Form Card */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xl">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-surface border border-outline-variant rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@wellness.io"
                  className="w-full bg-surface border border-outline-variant rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface">
                  Password
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => showToast("Password reset link sent to your email", "info")}
                    className="text-[11px] text-primary hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface border border-outline-variant rounded-xl pl-10 pr-10 py-3 text-sm focus:ring-2 focus:ring-primary-container outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-on-surface-variant">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>Remember this device</span>
              </label>

              {email.toLowerCase().includes('admin') && (
                <span className="text-[11px] font-bold text-secondary bg-secondary-container/40 px-2 py-0.5 rounded-full">
                  Admin Access
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Free Account' : 'Sign In to Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Toggle Sign in / Sign up */}
            <div className="pt-4 text-center border-t border-surface-container">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                }}
                className="text-xs text-on-surface-variant hover:text-primary font-semibold cursor-pointer"
              >
                {isSignUp
                  ? 'Already have an account? Sign In here'
                  : "Don't have an account? Register free account"}
              </button>
            </div>
          </form>
        </div>

        {/* Security / HIPAA compliance footer */}
        <div className="text-center mt-6 text-xs text-on-surface-variant flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <span>HIPAA Telehealth Security • 256-Bit SSL Encryption</span>
        </div>
      </div>
    </div>
  );
}
