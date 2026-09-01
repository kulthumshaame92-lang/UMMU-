import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Star, BookOpen, Utensils, HeartHandshake, CheckCircle2, ChevronRight, Activity, Calendar } from 'lucide-react';

export default function HomePage() {
  const { setCurrentPage, openBooking } = useApp();

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Holistic Plan Member",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHlNkHNkSKNx3gWSt4xTrNcMRKA_P8PsTYGuMQRxSgXjol1W0TnM3MAqzaiyoB8389kW0QHaYbAn85YWrTyO43tALJDTspY7GDPhbM0I6pkiUwhnwX34ZX77a05cXV4hUfsYy4Tyd63604EWseUA52SGV7DpaFvM67MpGUQo5FbHqV7zCbBR0DiP8VEGl2kSFcw280W4kFyS8f4vKsHmGgwqK8zCOhP2m9W5mAhLcGMwxwFllxiaBGGA",
      rating: 5,
      quote: "The personalized support I received was unparalleled. It didn't feel like a restrictive diet, but rather a completely new way of understanding my body's needs. The boutique feel of the platform made every interaction a joy."
    },
    {
      name: "David Miller",
      role: "Performance Nutrition Client",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKltQc9vAP199gJQEl-pt5A93Yo1a1IEA5njzfAykQ1ennj9JpS-apb7ExfyBwNwX3-aiOTzZFCh13FyhQbX13pz9McqvPiDuBYsQtj_MxIEO7H51becY4LaJ1eIT_bzf4DZZjsb0jR-kSHIb4w4N1jnwmVm5_jqOvdXTZQ_8Cm4kyOhHjry2YwUkODDoJ-iugjw4OD4GGTA8QtEbwYi_QFbM8y1mGx88cVSUW6hqCu8OaG7V3FEMEDQ",
      rating: 5,
      quote: "NutriCare Hub transformed my relationship with food. The meal guidance is practical, and the educational resources are incredibly insightful. I finally feel like I have a sustainable plan that fits my rigorous training schedule."
    },
    {
      name: "Emma Vance",
      role: "Metabolic Vitality Client",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      rating: 5,
      quote: "The combination of evidence-based dietician oversight and the interactive meal tracker helped me overcome persistent afternoon fatigue and optimize my biomarkers in just 8 weeks."
    }
  ];

  const highlights = [
    { label: "Client Satisfaction", value: "99.4%" },
    { label: "Custom Protocols Crafted", value: "14,500+" },
    { label: "Board-Certified Dietitians", value: "45+" },
    { label: "Average Energy Boost", value: "+38%" }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-8 pb-16 lg:pb-24 overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 lg:via-background/80 to-transparent z-10" />
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6io293iCAZ16xhmAME_z0qHFrxSsiW-pmCKeADs2lshSUsF3QlAyqy-pcaIpi_Yg9QZ9cB4v2pDv2Kk8rogNkiquDfON8e7io7pVzkRi9qtoijUHapSn9rWN9nLzr-KazoEgx5mFMuoggkl9FLXc1YQ-R91gmFWeK8-gziIZTiuYNVdhjb5-pgX-kYfospG-xBsisZqu5TnHmB8xu-Lxd-Rm8gSZPVOpljQJ_RKJnbgXp2TMsreKhhw')`
            }}
          />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-container-max mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-semibold text-xs uppercase tracking-wider mb-6 border border-secondary-container shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Premium Wellness Nutrition</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface mb-6 leading-[1.15]">
              Your Journey to a <br />
              <span className="text-gradient">Healthier You</span> Starts Here.
            </h1>

            <p className="text-lg text-on-surface-variant mb-8 max-w-xl leading-relaxed">
              Experience a personalized approach to nutrition that combines clinical expertise with the warmth of boutique wellness. Tailored plans, expert guidance, and lasting vitality.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setCurrentPage('assessment')}
                className="bg-primary-container hover:bg-amber-500 text-on-primary-container font-semibold px-8 py-4 rounded-xl text-base shadow-[0_8px_24px_rgba(245,158,11,0.28)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.38)] transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Get Your Personalized Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openBooking()}
                className="bg-surface/80 hover:bg-surface border border-outline-variant text-on-surface font-semibold px-7 py-4 rounded-xl text-base hover:border-primary transition-all backdrop-blur-sm shadow-xs cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-primary" />
                <span>Book Consultation</span>
              </button>
            </div>

            {/* Micro trust proofs */}
            <div className="mt-10 pt-8 border-t border-surface-container flex flex-wrap items-center gap-6 text-xs text-on-surface-variant font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span>Board-Certified Dietitians</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary-container fill-primary-container" />
                <span>4.9 / 5.0 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>100% Tailored Macro Blueprints</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Counter Strip */}
      <section className="bg-surface-container-low border-y border-surface-container py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {highlights.map((item, idx) => (
            <div key={idx} className="p-3">
              <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-on-surface-variant">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview Bento Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              Comprehensive Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-on-surface mb-4">
              Holistic Nutrition Approach
            </h2>
            <p className="text-base text-on-surface-variant">
              Discover an integrated ecosystem designed to elevate your well-being through evidence-based education, personalized meal planning, and ongoing professional oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Nutritional Education (Spans 2 cols) */}
            <div 
              onClick={() => setCurrentPage('education')}
              className="md:col-span-2 glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer hover-lift border border-surface-container"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary-container/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center mb-6">
                    <BookOpen className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                    Nutritional Education & Science
                  </h3>
                  <p className="text-on-surface-variant text-base leading-relaxed max-w-xl">
                    Empower yourself with evidence-based knowledge. Access our curated library of articles, biochemical research, webinars, and expert insights to understand the "why" behind your nutrition.
                  </p>
                </div>

                <div className="pt-6 flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  <span>Explore Education Library</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* Bento Card 2: Meal Guidance */}
            <div 
              onClick={() => setCurrentPage('recipes')}
              className="glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer hover-lift border border-surface-container flex flex-col justify-between"
            >
              <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-secondary-container/20 to-transparent" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center mb-6">
                  <Utensils className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-3 group-hover:text-secondary transition-colors">
                  Meal Guidance & Recipes
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Delicious, nutrient-dense culinary blueprints tailored to your specific dietary goals, allergies, and metabolic profile.
                </p>
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs rounded-full font-medium">
                    Vegan Options
                  </span>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs rounded-full font-medium">
                    Gluten-Free
                  </span>
                  <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-xs rounded-full font-medium">
                    Low-FODMAP
                  </span>
                </div>
                <div className="flex items-center text-secondary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  <span>Browse Recipes</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

            {/* Bento Card 3: Personalized Support (Full 3 cols) */}
            <div 
              onClick={() => setCurrentPage('nutritionist')}
              className="md:col-span-3 glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 group cursor-pointer hover-lift border border-surface-container"
            >
              <div className="flex-1">
                <div className="w-14 h-14 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center mb-6">
                  <HeartHandshake className="w-7 h-7 text-tertiary" />
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  Continuous 1-on-1 Personalized Support
                </h3>
                <p className="text-on-surface-variant text-base leading-relaxed mb-6 max-w-2xl">
                  Work directly with certified clinical nutritionists. Receive regular weekly check-ins, real-time biomarker and macro adjustments, and compassionate guidance to ensure you stay on the path to sustained vitality.
                </p>
                <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  <span>Meet Our Dietitians</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div className="w-full md:w-80 h-56 rounded-xl overflow-hidden shrink-0 relative shadow-md">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN1KetbNCKbl5X3yixA-C93B9SFju138SPhGmJU5bqAb5sj4w-81mPezvINABK3Z0QQIs4U9aXzMvGVWYCQmSKiWGVQyUqzbxEyzR9CZPFElQINYwk4KiCDUifb8ReO_bcr6QTLysP1dUja6Uqmw-E_A50LuejIoVPUijQTw3zVDirIHAaWo9hwHRYhLDPPXLmiXi1xKwnvIYmiFwNoIna_AdINEuzkvO3qP8pF40DdES0KBzWO7FRIA"
                  alt="App interface and wellness lifestyle"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-primary flex items-center gap-1.5 shadow-sm">
                  <Activity className="w-3.5 h-3.5 text-secondary" />
                  <span>Real-Time Health Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-container-low border-t border-surface-container">
        <div className="max-w-container-max mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              Proven Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-on-surface mb-4">
              Client Journeys & Transformations
            </h2>
            <p className="text-base text-on-surface-variant">
              Real stories of vitality and lasting wellness from individuals who embraced the NutriCare Hub approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-surface rounded-2xl p-8 shadow-ambient-sm border border-surface-container hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary-container shadow-xs"
                    />
                    <div>
                      <h4 className="font-bold text-on-surface text-base">
                        {t.name}
                      </h4>
                      <p className="text-xs text-on-surface-variant font-medium">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-on-surface-variant text-sm italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-amber-900 to-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-container-max mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15">
            Personalized For Your Lifestyle
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-2xl mx-auto">
            Ready to Experience Nutrition Engineered for You?
          </h2>
          <p className="text-base sm:text-lg text-amber-100 max-w-xl mx-auto mb-8">
            Take our 2-minute comprehensive intake assessment to receive your custom caloric and macronutrient targets.
          </p>
          <button
            onClick={() => setCurrentPage('assessment')}
            className="bg-white text-primary hover:bg-amber-50 font-bold px-8 py-4 rounded-xl text-base shadow-lg transform hover:-translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Start Free Nutrition Assessment</span>
          </button>
        </div>
      </section>
    </div>
  );
}
