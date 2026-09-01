export const NUTRITIONISTS = [
  {
    id: "sarah-jenkins",
    name: "Dr. Sarah Jenkins, RD, PhD",
    title: "Clinical Nutritionist & Metabolic Health Specialist",
    rating: 4.9,
    reviewCount: 128,
    experience: "12+ Years",
    clientsHelped: "1,400+",
    avatar: "https://images.unsplash.com/photo-1594824813627-c3773fb2a95c?auto=format&fit=crop&q=80&w=400",
    coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1200",
    about: "Dr. Sarah Jenkins holds a PhD in Nutritional Biochemistry from Stanford and has dedicated over a decade to helping clients achieve lasting metabolic health, sustainable weight optimization, and peak digestive vitality through science-backed, boutique personalized nutrition strategies.",
    specialties: [
      "Metabolic Health & Longevity",
      "Gut Microbiome Optimization",
      "Hormonal Balance & PCOS",
      "Boutique Meal Engineering",
      "Anti-Inflammatory Protocols"
    ],
    credentials: [
      { degree: "Ph.D. in Nutritional Biochemistry", institution: "Stanford University School of Medicine" },
      { degree: "Registered Dietitian Nutritionist (RDN)", institution: "Commission on Dietetic Registration" },
      { degree: "B.S. in Clinical Dietetics & Physiology", institution: "Cornell University" }
    ],
    consultationTiers: [
      {
        id: "initial-eval",
        name: "Initial Comprehensive Assessment",
        duration: "60 mins",
        price: "$180",
        features: [
          "Complete metabolic & dietary history analysis",
          "Biomarker & lifestyle review",
          "Custom macro targets & 7-day starter plan",
          "Follow-up portal messaging for 14 days"
        ]
      },
      {
        id: "follow-up",
        name: "Targeted Strategy & Progress Session",
        duration: "30 mins",
        price: "$95",
        features: [
          "Dietary progress evaluation & biometrics check",
          "Plan adjustments & recipe swaps",
          "Q&A and habit recalibration"
        ]
      },
      {
        id: "monthly-care",
        name: "Full Boutique Concierge Care",
        duration: "Monthly Plan",
        price: "$340/mo",
        badge: "Most Popular",
        features: [
          "Bi-weekly 45-min 1-on-1 video sessions",
          "Weekly dynamically adjusted meal blueprints",
          "Direct 24/7 priority dietitian messaging",
          "Continuous grocery list & dining out guidance"
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        author: "Eleanor Vance",
        role: "Verified Client • 6-Month Journey",
        rating: 5,
        date: "August 14, 2026",
        comment: "Working with Dr. Jenkins completely resolved my chronic gut inflammation and fatigue. Her approach is extraordinarily compassionate, scientific, and realistic for a busy lifestyle.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
      },
      {
        id: 2,
        author: "Marcus Thorne",
        role: "Verified Client • Athletic Optimization",
        rating: 5,
        date: "July 29, 2026",
        comment: "The precision in Dr. Sarah's macro engineering helped me drop 7% body fat while gaining clean energy and lean muscle. The recipes are gourmet and effortless.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
      },
      {
        id: 3,
        author: "Amira Patel",
        role: "Verified Client • Hormone Balance",
        rating: 5,
        date: "June 18, 2026",
        comment: "I finally found someone who understands hormonal harmony without resorting to extreme deprivation. She makes nutrition feel like self-care rather than a chore.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance, MS, CNS",
    title: "Sports Nutrition & Body Recomposition Specialist",
    rating: 4.85,
    reviewCount: 94,
    experience: "9+ Years",
    clientsHelped: "980+",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200",
    about: "Marcus specializes in athletic performance, lean hypertrophy, and metabolic acceleration for active individuals and endurance athletes.",
    specialties: [
      "Lean Body Recomposition",
      "Endurance Fueling & Recovery",
      "Macro Nutrient Periodization",
      "Plant-Forward High Protein Diets"
    ],
    credentials: [
      { degree: "M.S. in Exercise Physiology & Sports Nutrition", institution: "Columbia University" },
      { degree: "Certified Nutrition Specialist (CNS)", institution: "American Nutrition Association" }
    ],
    consultationTiers: [
      {
        id: "initial-eval",
        name: "Performance Intake Consultation",
        duration: "50 mins",
        price: "$160",
        features: ["Metabolic rate testing analysis", "Personalized fuel timing schedule", "Supplement audit"]
      }
    ],
    reviews: []
  }
];
