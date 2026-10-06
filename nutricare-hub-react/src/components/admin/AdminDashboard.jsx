import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NUTRITIONISTS } from '../../data/nutritionistsData';
import { RECIPES_DATA } from '../../data/recipesData';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Utensils, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Video, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  ShieldCheck, 
  Download, 
  Filter, 
  Sparkles, 
  Check, 
  X, 
  FileText,
  Activity,
  Award
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout, showToast, setCurrentPage } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'bookings', 'assessments', 'recipes', 'staff', 'audit'
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingFilter, setBookingFilter] = useState('All');

  // Interactive Bookings State
  const [bookings, setBookings] = useState([
    {
      id: "BK-8901",
      client: "Alex Morgan",
      email: "alex.morgan@wellness.io",
      dietitian: "Dr. Sarah Jenkins, RD",
      tier: "Initial Comprehensive Assessment",
      price: "$180",
      date: "Tue, Oct 15, 2026",
      time: "10:30 AM",
      format: "Google Meet HD",
      status: "Confirmed"
    },
    {
      id: "BK-8902",
      client: "Michael Vance",
      email: "m.vance@techcorp.com",
      dietitian: "Marcus Vance, MS",
      tier: "Performance Intake Consultation",
      price: "$160",
      date: "Tue, Oct 15, 2026",
      time: "02:00 PM",
      format: "Google Meet HD",
      status: "Confirmed"
    },
    {
      id: "BK-8903",
      client: "Elena Rostova",
      email: "elena.r@lifestyle.org",
      dietitian: "Dr. Sarah Jenkins, RD",
      tier: "Targeted Strategy Session",
      price: "$95",
      date: "Wed, Oct 16, 2026",
      time: "11:00 AM",
      format: "Phone Telehealth",
      status: "Pending Review"
    },
    {
      id: "BK-8904",
      client: "David Miller",
      email: "david.miller@runner.io",
      dietitian: "Dr. Sarah Jenkins, RD",
      tier: "Full Boutique Concierge Care",
      price: "$340",
      date: "Fri, Oct 18, 2026",
      time: "01:30 PM",
      format: "Google Meet HD",
      status: "Completed"
    },
    {
      id: "BK-8905",
      client: "Chloe Bennett",
      email: "chloe.b@greenlife.com",
      dietitian: "Marcus Vance, MS",
      tier: "Targeted Strategy Session",
      price: "$95",
      date: "Sat, Oct 19, 2026",
      time: "11:00 AM",
      format: "Google Meet HD",
      status: "Confirmed"
    }
  ]);

  // Assessments queue
  const [assessments, setAssessments] = useState([
    {
      id: "AS-101",
      client: "Alex Morgan",
      age: 28,
      gender: "Female",
      bmi: "21.6 (Healthy)",
      diet: "Mediterranean",
      goal: "Metabolic Longevity & Satiety",
      allergies: "Gluten-Sensitive",
      targetCal: "1,950 Kcal",
      submitted: "Today at 08:24 AM",
      status: "Plan Generated"
    },
    {
      id: "AS-102",
      client: "Jordan Hayes",
      age: 34,
      gender: "Male",
      bmi: "24.2 (Optimal)",
      diet: "High Protein / Paleo",
      goal: "Lean Muscle Hypertrophy",
      allergies: "None",
      targetCal: "2,600 Kcal",
      submitted: "Yesterday at 04:15 PM",
      status: "Review Needed"
    },
    {
      id: "AS-103",
      client: "Sophia Lin",
      age: 31,
      gender: "Female",
      bmi: "22.8 (Optimal)",
      diet: "Plant-Based / Low-FODMAP",
      goal: "Gut Microbiome & Bloat Elimination",
      allergies: "Lactose, Tree Nuts",
      targetCal: "1,850 Kcal",
      submitted: "2 days ago",
      status: "Plan Generated"
    }
  ]);

  // Recipes state for CRUD simulation
  const [recipeList, setRecipeList] = useState(RECIPES_DATA);

  // New Recipe Modal State
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    category: 'High Protein',
    calories: 450,
    protein: '35g',
    carbs: '40g',
    fats: '15g',
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
  });

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    showToast(`Booking ${bookingId} status updated to ${newStatus}`, 'success');
  };

  const handleAddRecipeSubmit = (e) => {
    e.preventDefault();
    if (!newRecipe.title) return;
    const added = {
      ...newRecipe,
      id: Date.now(),
      rating: 5.0,
      reviews: 1,
      tags: ["Chef Special", "Organic"],
      description: "Custom clinical culinary formulation designed for metabolic wellness."
    };
    setRecipeList([added, ...recipeList]);
    setIsAddRecipeOpen(false);
    showToast(`Recipe "${newRecipe.title}" added to active catalog!`, 'success');
  };

  const handleDeleteRecipe = (id) => {
    setRecipeList(prev => prev.filter(r => r.id !== id));
    showToast("Recipe removed from platform catalog", "info");
  };

  const handleExportData = () => {
    showToast("HIPAA compliant telemetry & bookings CSV exported successfully!", "success");
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (bookingFilter === 'All') return matchesSearch;
    return matchesSearch && b.status === bookingFilter;
  });

  return (
    <div className="w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Admin Navigation Header */}
      <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1594824813627-c3773fb2a95c?auto=format&fit=crop&q=80&w=400"}
              alt="Admin Avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-container shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-surface" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-primary-container text-on-primary-container text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                👑 Lead Administrator
              </span>
              <span className="text-xs text-secondary font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> HIPAA Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">
              {user?.name || "Dr. Sarah Jenkins, RD, PhD"}
            </h1>
            <p className="text-xs text-on-surface-variant font-mono">
              Admin Portal • NutriCare Hub Clinical Engine v2.4
            </p>
          </div>
        </div>

        {/* Action Controls & Sign Out */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 rounded-xl bg-surface border border-outline-variant hover:border-primary text-on-surface text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Export Telemetry</span>
          </button>

          <button
            onClick={() => setCurrentPage('home')}
            className="px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold cursor-pointer transition-all"
          >
            View Live Site
          </button>

          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 border-b border-surface-container scrollbar-none">
        {[
          { id: 'overview', label: 'Overview & KPI Metrics', icon: LayoutDashboard },
          { id: 'bookings', label: `Consultation Bookings (${bookings.length})`, icon: Calendar },
          { id: 'assessments', label: `Client Intakes (${assessments.length})`, icon: Activity },
          { id: 'recipes', label: `Recipe Catalog (${recipeList.length})`, icon: Utensils },
          { id: 'staff', label: 'Dietitian Roster', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary-container text-on-primary-container shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Overview & Performance KPI Metrics */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-surface rounded-2xl p-6 border border-surface-container shadow-ambient-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Monthly Revenue</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-on-surface mb-1">$18,450</div>
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +24.8% from last month
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-surface-container shadow-ambient-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Sessions Booked</span>
                <div className="w-9 h-9 rounded-xl bg-primary-container/30 text-primary flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-on-surface mb-1">142</div>
              <p className="text-xs text-primary font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 18 scheduled this week
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-surface-container shadow-ambient-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Active Clients</span>
                <div className="w-9 h-9 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-on-surface mb-1">384</div>
              <p className="text-xs text-secondary font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 99.4% Protocol Adherence
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-surface-container shadow-ambient-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Client Rating</span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  ★
                </div>
              </div>
              <div className="text-3xl font-bold text-on-surface mb-1">4.96 / 5.0</div>
              <p className="text-xs text-on-surface-variant font-medium">
                Based on 280+ verified reviews
              </p>
            </div>
          </div>

          {/* Quick Schedule & Telehealth Monitor Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Upcoming Consultations Table (8 cols) */}
            <div className="lg:col-span-8 bg-surface rounded-3xl p-6 sm:p-7 border border-surface-container shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-on-surface">Upcoming Telehealth Consultations</h3>
                  <p className="text-xs text-on-surface-variant">Next 48 hours clinician schedule</p>
                </div>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  View All ({bookings.length}) →
                </button>
              </div>

              <div className="space-y-3">
                {bookings.slice(0, 3).map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shrink-0">
                        {b.client.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">{b.client}</h4>
                        <p className="text-xs text-on-surface-variant">{b.tier} • <span className="font-bold text-primary">{b.price}</span></p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs w-full sm:w-auto justify-between sm:justify-end">
                      <span className="font-semibold text-on-surface flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary" /> {b.time}, {b.date.split(',')[0]}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {b.status}
                      </span>
                      <button
                        onClick={() => showToast(`Launching encrypted video conference with ${b.client}...`, 'info')}
                        className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-bold text-xs flex items-center gap-1 cursor-pointer hover:bg-amber-500"
                      >
                        <Video className="w-3.5 h-3.5" /> Join Meet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Protocol Tools (4 cols) */}
            <div className="lg:col-span-4 bg-surface rounded-3xl p-6 sm:p-7 border border-surface-container shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-on-surface mb-2">Quick Admin Actions</h3>
                <p className="text-xs text-on-surface-variant mb-6">Manage platform data & patient care protocols</p>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setActiveTab('recipes');
                      setIsAddRecipeOpen(true);
                    }}
                    className="w-full p-3.5 rounded-xl bg-primary-container/20 hover:bg-primary-container/30 border border-primary/30 text-primary text-xs font-bold flex items-center gap-2 cursor-pointer transition-all text-left"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Recipe Blueprint</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('assessments')}
                    className="w-full p-3.5 rounded-xl bg-secondary-container/30 hover:bg-secondary-container/40 border border-secondary/30 text-secondary text-xs font-bold flex items-center gap-2 cursor-pointer transition-all text-left"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Review Pending Intakes ({assessments.length})</span>
                  </button>

                  <button
                    onClick={() => setCurrentPage('assessment')}
                    className="w-full p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container text-on-surface text-xs font-bold flex items-center gap-2 cursor-pointer transition-all text-left"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Launch Intake Simulator</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between text-[11px] text-on-surface-variant">
                <span className="flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> 256-Bit Encrypted
                </span>
                <span>Active Server: US-East</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Consultation Bookings Management */}
      {activeTab === 'bookings' && (
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xl animate-fadeIn space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Client Telehealth Bookings</h2>
              <p className="text-xs text-on-surface-variant">Manage scheduled intake sessions, confirmations, and video links</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search client, email, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <select
                value={bookingFilter}
                onChange={(e) => setBookingFilter(e.target.value)}
                className="bg-surface-container-low border border-outline-variant rounded-xl px-3 py-2 text-xs font-bold outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container text-[11px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container-low">
                  <th className="py-3 px-4 rounded-l-xl">Ref ID & Client</th>
                  <th className="py-3 px-4">Clinician & Service</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Modality</th>
                  <th className="py-3 px-4">Fee</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-xs">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-4 px-4 font-semibold text-on-surface">
                      <div className="font-mono text-[11px] text-primary">{b.id}</div>
                      <div className="font-bold text-sm">{b.client}</div>
                      <div className="text-[11px] text-on-surface-variant">{b.email}</div>
                    </td>

                    <td className="py-4 px-4 text-on-surface">
                      <div className="font-medium">{b.dietitian}</div>
                      <div className="text-[11px] text-on-surface-variant">{b.tier}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-on-surface">{b.date}</div>
                      <div className="text-[11px] text-primary font-semibold">{b.time}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1.5 text-on-surface font-medium">
                        <Video className="w-3.5 h-3.5 text-secondary" />
                        <span>{b.format}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 font-bold text-on-surface text-sm">
                      {b.price}
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' :
                        b.status === 'Completed' ? 'bg-secondary-container/40 text-secondary' :
                        'bg-amber-50 text-amber-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleStatusChange(b.id, b.status === 'Confirmed' ? 'Completed' : 'Confirmed')}
                        className="p-1.5 rounded-lg bg-surface border border-outline-variant hover:border-emerald-500 text-emerald-600 cursor-pointer"
                        title="Toggle status"
                      >
                        <Check className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleStatusChange(b.id, 'Cancelled')}
                        className="p-1.5 rounded-lg bg-surface border border-outline-variant hover:border-rose-500 text-rose-600 cursor-pointer"
                        title="Cancel booking"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Client Assessments Queue */}
      {activeTab === 'assessments' && (
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xl animate-fadeIn space-y-6">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Client Metabolic & Intake Assessments</h2>
            <p className="text-xs text-on-surface-variant">Review digital intakes, calculated TDEE targets, and auto-generated meal plans</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assessments.map((a) => (
              <div key={a.id} className="p-6 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-primary">{a.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary-container/40 text-secondary">
                      {a.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-1">{a.client}</h3>
                  <p className="text-xs text-on-surface-variant">{a.age} yrs • {a.gender} • BMI: {a.bmi}</p>
                  
                  <div className="mt-4 pt-3 border-t border-surface-container space-y-1.5 text-xs text-on-surface-variant">
                    <p>• Goal: <strong className="text-on-surface">{a.goal}</strong></p>
                    <p>• Protocol: <strong className="text-on-surface">{a.diet}</strong></p>
                    <p>• Allergies: <strong className="text-amber-700">{a.allergies}</strong></p>
                    <p>• Caloric Budget: <strong className="text-primary font-bold">{a.targetCal}</strong></p>
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                  <span className="text-[11px] text-on-surface-variant">{a.submitted}</span>
                  <button
                    onClick={() => {
                      showToast(`Calibrated protocol loaded for ${a.client}`, 'success');
                      setCurrentPage('diet-plan');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs hover:bg-amber-500 cursor-pointer"
                  >
                    View Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Recipe Catalog Management */}
      {activeTab === 'recipes' && (
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xl animate-fadeIn space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Curated Recipe Blueprints</h2>
              <p className="text-xs text-on-surface-variant">Manage recipes published across the NutriCare platform</p>
            </div>

            <button
              onClick={() => setIsAddRecipeOpen(true)}
              className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Recipe</span>
            </button>
          </div>

          {/* Add Recipe Modal Overlay */}
          {isAddRecipeOpen && (
            <div className="p-6 rounded-2xl bg-surface-container border border-primary/40 space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-on-surface">Add New Recipe Blueprint</h3>
              <form onSubmit={handleAddRecipeSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase tracking-wider mb-1">Recipe Title</label>
                  <input
                    type="text"
                    value={newRecipe.title}
                    onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                    placeholder="e.g. Seared Wild Halibut with Asparagus"
                    className="w-full bg-surface border border-outline-variant rounded-xl p-2.5 text-xs outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={newRecipe.category}
                    onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-2.5 text-xs outline-none"
                  >
                    <option value="High Protein">High Protein</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Plant-Based">Plant-Based</option>
                    <option value="Smoothies">Smoothies</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Calories (Kcal)</label>
                  <input
                    type="number"
                    value={newRecipe.calories}
                    onChange={(e) => setNewRecipe({ ...newRecipe, calories: parseInt(e.target.value) || 0 })}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-2.5 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Protein (g)</label>
                  <input
                    type="text"
                    value={newRecipe.protein}
                    onChange={(e) => setNewRecipe({ ...newRecipe, protein: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-2.5 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Prep Time</label>
                  <input
                    type="text"
                    value={newRecipe.prepTime}
                    onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl p-2.5 text-xs outline-none"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddRecipeOpen(false)}
                    className="px-4 py-2 rounded-xl bg-surface border text-on-surface font-semibold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs cursor-pointer hover:bg-amber-500"
                  >
                    Save & Publish Recipe
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipeList.map((r) => (
              <div key={r.id} className="bg-surface-container-low rounded-2xl overflow-hidden border border-surface-container flex flex-col justify-between">
                <div>
                  <img src={r.image} alt={r.title} className="w-full h-40 object-cover" />
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-secondary">{r.category}</span>
                      <span className="text-primary font-mono">{r.prepTime}</span>
                    </div>
                    <h4 className="font-bold text-on-surface text-sm line-clamp-1">{r.title}</h4>
                    <div className="flex gap-2 text-xs font-semibold text-on-surface-variant">
                      <span>🔥 {r.calories} Kcal</span>
                      <span>•</span>
                      <span className="text-primary">{r.protein} Protein</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-surface-container flex items-center justify-between">
                  <button
                    onClick={() => showToast(`Editing recipe #${r.id}`, 'info')}
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRecipe(r.id)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-800 cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Staff & Dietitian Roster */}
      {activeTab === 'staff' && (
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xl animate-fadeIn space-y-6">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Registered Dietitians & Clinical Staff</h2>
            <p className="text-xs text-on-surface-variant">Manage dietician credentials, availability schedules, and tier pricing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NUTRITIONISTS.map((nutri) => (
              <div key={nutri.id} className="p-6 rounded-2xl bg-surface-container-low border border-surface-container flex items-start gap-5">
                <img
                  src={nutri.avatar}
                  alt={nutri.name}
                  className="w-18 h-18 rounded-2xl object-cover border-2 border-primary-container shrink-0"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-on-surface">{nutri.name}</h3>
                    <span className="text-xs font-bold text-amber-500">★ {nutri.rating}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">{nutri.title}</p>
                  
                  <div className="flex flex-wrap gap-1 pt-1">
                    {nutri.specialties.map((sp, idx) => (
                      <span key={idx} className="text-[10px] bg-surface-container px-2 py-0.5 rounded font-medium text-on-surface">
                        {sp}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                    <span className="text-secondary font-bold">Active & Accepting Clients</span>
                    <button
                      onClick={() => showToast(`Schedule editor opened for ${nutri.name}`, 'info')}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      Edit Availability
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
