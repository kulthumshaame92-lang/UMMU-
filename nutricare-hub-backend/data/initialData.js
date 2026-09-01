export const INITIAL_NUTRITIONISTS = [
  {
    id: "sarah-jenkins",
    name: "Dr. Sarah Jenkins, RD, PhD",
    title: "Clinical Nutritionist & Metabolic Health Specialist",
    email: "sarah.jenkins@nutricarehub.com",
    rating: 4.95,
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
        price: 180,
        currency: "USD",
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
        price: 95,
        currency: "USD",
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
        price: 340,
        currency: "USD",
        badge: "Most Popular",
        features: [
          "Bi-weekly 45-min 1-on-1 video sessions",
          "Weekly dynamically adjusted meal blueprints",
          "Direct 24/7 priority dietitian messaging",
          "Continuous grocery list & dining out guidance"
        ]
      }
    ],
    availableSlots: [
      "2026-09-05T09:00:00Z",
      "2026-09-05T11:00:00Z",
      "2026-09-05T14:00:00Z",
      "2026-09-06T10:00:00Z",
      "2026-09-06T15:30:00Z",
      "2026-09-07T13:00:00Z"
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Eleanor Vance",
        role: "Verified Client • 6-Month Journey",
        rating: 5,
        date: "2026-08-14",
        comment: "Working with Dr. Jenkins completely resolved my chronic gut inflammation and fatigue. Her approach is extraordinarily compassionate, scientific, and realistic for a busy lifestyle.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
      },
      {
        id: "rev-2",
        author: "Marcus Thorne",
        role: "Verified Client • Athletic Optimization",
        rating: 5,
        date: "2026-07-29",
        comment: "The precision in Dr. Sarah's macro engineering helped me drop 7% body fat while gaining clean energy and lean muscle. The recipes are gourmet and effortless.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
      }
    ]
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance, MS, CNS",
    title: "Sports Nutrition & Body Recomposition Specialist",
    email: "marcus.vance@nutricarehub.com",
    rating: 4.88,
    reviewCount: 94,
    experience: "9+ Years",
    clientsHelped: "980+",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200",
    about: "Marcus specializes in athletic performance, lean hypertrophy, and metabolic acceleration for active individuals, marathon runners, and cross-training athletes.",
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
        price: 160,
        currency: "USD",
        features: ["Metabolic rate testing analysis", "Personalized fuel timing schedule", "Supplement audit"]
      },
      {
        id: "follow-up",
        name: "Macro Calibration & Training Sync",
        duration: "30 mins",
        price: 85,
        currency: "USD",
        features: ["Intra-workout fuel review", "Body composition tracking", "Meal timing tweaks"]
      }
    ],
    availableSlots: [
      "2026-09-04T10:00:00Z",
      "2026-09-04T13:00:00Z",
      "2026-09-05T15:00:00Z",
      "2026-09-08T11:00:00Z"
    ],
    reviews: [
      {
        id: "rev-3",
        author: "David Chen",
        role: "Triathlete Client",
        rating: 5,
        date: "2026-08-02",
        comment: "Marcus tailored my carb-loading and hydration plan for my first Ironman. Never hit a wall and recovery was swift!",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
      }
    ]
  }
];

export const INITIAL_RECIPES = [
  {
    id: "rec-1",
    title: "Mediterranean Citrus Salmon with Herb Quinoa",
    category: "High Protein",
    tags: ["Gluten-Free", "High-Protein", "Heart-Healthy", "Omega-3"],
    calories: 540,
    protein: 44,
    carbs: 38,
    fats: 22,
    fiber: 8,
    prepTime: "25 mins",
    difficulty: "Easy",
    rating: 4.9,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    description: "Rich Alaskan sockeye salmon pan-seared in avocado oil with fresh orange zest, paired with fluffy tri-color quinoa and baby herb greens.",
    ingredients: [
      "180g Wild Alaskan Salmon Fillet",
      "3/4 cup Cooked Tri-Color Quinoa",
      "1 tbsp Cold-Pressed Extra Virgin Olive Oil",
      "1 cup Fresh Baby Spinach & Arugula",
      "1/2 Meyer Lemon & Orange Zest",
      "Pinch of Himalayan Pink Salt & Black Pepper"
    ],
    instructions: [
      "Season salmon fillet with citrus zest, salt, and pepper.",
      "Heat olive oil in a cast-iron skillet over medium-high heat.",
      "Sear salmon skin-side down for 4 minutes, flip and cook for 3 more minutes.",
      "Toss warm quinoa with baby greens and serve alongside the salmon."
    ]
  },
  {
    id: "rec-2",
    title: "Golden Turmeric Overnight Chia Oats",
    category: "Breakfast",
    tags: ["Vegan", "Anti-Inflammatory", "Meal-Prep", "Gut-Friendly"],
    calories: 420,
    protein: 18,
    carbs: 54,
    fats: 14,
    fiber: 12,
    prepTime: "10 mins",
    difficulty: "Quick",
    rating: 4.8,
    reviews: 62,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    description: "Creamy almond milk soaked rolled oats and chia seeds infused with organic Ceylon cinnamon, turmeric, raw honey, and fresh citrus slices.",
    ingredients: [
      "1/2 cup Organic Rolled Oats",
      "2 tbsp Black Chia Seeds",
      "1 cup Unsweetened Vanilla Almond Milk",
      "1/2 tsp Ground Turmeric & Ceylon Cinnamon",
      "1 tbsp Raw Wildflower Honey",
      "Fresh Blood Orange Slices"
    ],
    instructions: [
      "Combine oats, chia seeds, turmeric, and cinnamon in a glass jar.",
      "Pour almond milk and stir thoroughly until well blended.",
      "Refrigerate overnight (minimum 6 hours).",
      "Top with raw honey and fresh citrus before serving."
    ]
  },
  {
    id: "rec-3",
    title: "Avocado & Wild Herb Green Goddess Bowl",
    category: "Plant-Based",
    tags: ["Vegan", "Gluten-Free", "Detox", "Fiber-Rich"],
    calories: 480,
    protein: 16,
    carbs: 42,
    fats: 28,
    fiber: 14,
    prepTime: "15 mins",
    difficulty: "Easy",
    rating: 4.9,
    reviews: 110,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    description: "A vibrant nutrient-dense bowl with edamame, shaved radishes, baby kale, sprouted lentils, and an aromatic basil-tahini dressing.",
    ingredients: [
      "1/2 Hass Avocado sliced",
      "1/2 cup Steamed Organic Edamame",
      "1/2 cup Sprouted Brown Lentils",
      "2 cups Chopped Baby Tuscan Kale",
      "2 tbsp Tahini Basil Goddess Dressing",
      "1 tbsp Toasted Pumpkin Seeds"
    ],
    instructions: [
      "Massage baby kale lightly with a drop of olive oil.",
      "Arrange avocado, edamame, and sprouted lentils in quadrants.",
      "Drizzle with homemade tahini-basil dressing and garnish with pumpkin seeds."
    ]
  },
  {
    id: "rec-4",
    title: "Herb-Crusted Pasture Chicken & Roasted Yam",
    category: "High Protein",
    tags: ["Lean Protein", "Gluten-Free", "Post-Workout"],
    calories: 590,
    protein: 52,
    carbs: 46,
    fats: 18,
    fiber: 7,
    prepTime: "30 mins",
    difficulty: "Intermediate",
    rating: 4.95,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800",
    description: "Rosemary and thyme rubbed organic chicken breast paired with caramelized Japanese sweet yams and roasted garlic asparagus.",
    ingredients: [
      "200g Organic Chicken Breast",
      "1 medium Japanese Sweet Yam cubed",
      "6 spears Fresh Asparagus",
      "1 tbsp Rosemary, Thyme & Garlic Herb Blend",
      "1 tbsp Cold-Pressed Avocado Oil"
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Toss yams in avocado oil, roast for 25 minutes.",
      "Pan-sear seasoned chicken breast for 6 mins per side.",
      "Roast asparagus in the remaining skillet oil for 4 minutes and serve together."
    ]
  },
  {
    id: "rec-5",
    title: "Berry Bliss Hemp Seed Collagen Smoothie",
    category: "Smoothies",
    tags: ["Antioxidant", "Skin-Health", "Dairy-Free", "Quick-Fuel"],
    calories: 310,
    protein: 24,
    carbs: 32,
    fats: 9,
    fiber: 8,
    prepTime: "5 mins",
    difficulty: "Instant",
    rating: 4.85,
    reviews: 49,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800",
    description: "Frozen wild blueberries, unsweetened acai, grass-fed collagen peptides, coconut water, and raw Canadian hemp seeds.",
    ingredients: [
      "1 cup Frozen Wild Blueberries",
      "1 scoop Pure Collagen Peptides (or Pea Protein)",
      "2 tbsp Raw Shelled Hemp Seeds",
      "1 cup Pure Coconut Water",
      "1/2 tbsp Maca Root Powder"
    ],
    instructions: [
      "Place all ingredients into high-speed blender.",
      "Blend on high for 45-60 seconds until silky smooth.",
      "Pour into chilled glass and sprinkle extra hemp seeds on top."
    ]
  }
];

export const INITIAL_ARTICLES = [
  {
    id: "art-1",
    title: "The Biochemistry of Intermittent Fasting & Autophagy",
    category: "Metabolic Science",
    readTime: "6 min read",
    author: "Dr. Sarah Jenkins, RD, PhD",
    date: "2026-08-18",
    summary: "Discover how cellular recycling mechanisms can be safely activated through time-restricted feeding windows without metabolic slowdown.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    tags: ["Metabolism", "Longevity", "Cellular Health"],
    content: "Autophagy is the body's cellular recycling system. When fasting for 14-16 hours, intracellular stress activates lysosomal breakdown of damaged organelles, improving mitochondrial efficiency..."
  },
  {
    id: "art-2",
    title: "Gut Microbiome Diversity: The Hidden Driver of Energy",
    category: "Gut Health",
    readTime: "8 min read",
    author: "Dr. Sarah Jenkins, RD, PhD",
    date: "2026-08-10",
    summary: "Why consuming 30+ diverse plant varieties each week enhances short-chain fatty acid synthesis, mental resilience, and digestion.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    tags: ["Microbiome", "Immunity", "Digestion"],
    content: "Our gut bacteria produce short-chain fatty acids (SCFAs) such as butyrate, propionate, and acetate when fermenting diverse dietary fibers. These compounds fuel the colonic epithelium..."
  },
  {
    id: "art-3",
    title: "Protein Pacing & Muscle Synthesis for Longevity",
    category: "Sports Nutrition",
    readTime: "5 min read",
    author: "Marcus Vance, MS, CNS",
    date: "2026-07-27",
    summary: "How distributing 30-40g of high-leucine protein across 4 meals maximizes myofibrillar protein synthesis in adults over 30.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    tags: ["Protein", "Longevity", "Strength"],
    content: "Leucine triggers the mTORC1 pathway, stimulating muscle protein synthesis (MPS). Consuming at least 2.5-3g of leucine per meal ensures the anabolic threshold is crossed..."
  }
];

export const INITIAL_DEFAULT_DIET_PLAN = {
  id: "plan-default",
  userId: "user-demo",
  clientName: "Alex Morgan",
  planTitle: "Metabolic Vitality & Lean Toning Protocol",
  prescribedBy: "Dr. Sarah Jenkins, RD, PhD",
  targetCal: 2150,
  currentCal: 2120,
  durationWeeks: 8,
  currentWeek: 3,
  macros: {
    protein: { current: 155, target: 160, unit: "g", percentage: 30, color: "primary" },
    carbs: { current: 210, target: 215, unit: "g", percentage: 45, color: "secondary" },
    fats: { current: 62, target: 65, unit: "g", percentage: 25, color: "tertiary" },
    fiber: { current: 36, target: 38, unit: "g", percentage: 95, color: "emerald" },
    water: { current: 2.8, target: 3.5, unit: "L", percentage: 80 }
  },
  days: {
    "Monday": {
      summary: "High Energy & Complex Carbohydrates focus to kickstart the week",
      totalCalories: 2120,
      meals: [
        {
          id: "mon-breakfast",
          type: "Breakfast",
          time: "08:00 AM",
          title: "Golden Turmeric & Citrus Overnight Chia Bowl",
          calories: 460,
          protein: 26,
          carbs: 58,
          fats: 14,
          fiber: 12,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
          ingredients: [
            "1/3 cup Organic Rolled Oats & Chia Seeds",
            "1 cup Unsweetened Almond Milk",
            "1 scoop Grass-fed Vanilla Whey",
            "1/2 Blood Orange & Meyer Lemon Zest",
            "1 tbsp Crushed Raw Almonds & Honey"
          ],
          prepTime: "10 mins prep",
          tips: "Pre-soak chia seeds overnight in almond milk with a pinch of turmeric."
        },
        {
          id: "mon-lunch",
          type: "Lunch",
          time: "01:00 PM",
          title: "Wild Salmon, Citrus Quinoa & Avocado Bowl",
          calories: 680,
          protein: 48,
          carbs: 52,
          fats: 28,
          fiber: 10,
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
          ingredients: [
            "180g Pan-Seared Alaskan Sockeye Salmon",
            "3/4 cup Fluffy Tri-Color Quinoa",
            "1/2 Hass Avocado sliced",
            "1.5 cups Baby Spinach & Arugula mix",
            "Citrus Herb Vinaigrette"
          ],
          prepTime: "20 mins",
          tips: "Pan sear salmon skin-side down for 4 mins to render omega-3 rich oils."
        },
        {
          id: "mon-snack",
          type: "Afternoon Fuel",
          time: "04:30 PM",
          title: "Cultured Labneh, Walnuts & Pomegranate Arils",
          calories: 290,
          protein: 18,
          carbs: 22,
          fats: 12,
          fiber: 4,
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
          ingredients: [
            "150g Cultured Probiotic Greek Labneh",
            "1 tbsp Activated Raw Walnut Halves",
            "2 tbsp Fresh Pomegranate Seeds",
            "Drizzle of raw clover honey"
          ],
          prepTime: "5 mins",
          tips: "Probiotic cultures in labneh support optimal gut motility."
        },
        {
          id: "mon-dinner",
          type: "Dinner",
          time: "07:30 PM",
          title: "Herb Roasted Pasture-Raised Chicken & Japanese Yam",
          calories: 690,
          protein: 63,
          carbs: 78,
          fats: 8,
          fiber: 10,
          image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600",
          ingredients: [
            "220g Organic Herb Roasted Chicken Breast",
            "1 medium Japanese Sweet Purple Yam roasted",
            "1 cup Charred Garlic Broccolini",
            "1 tbsp Extra Virgin Olive Oil & Lemon juice"
          ],
          prepTime: "25 mins",
          tips: "Yams supply slow-digesting resistant starches to stabilize overnight glucose."
        }
      ]
    }
  }
};
