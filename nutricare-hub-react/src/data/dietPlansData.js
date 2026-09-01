export const DEFAULT_DIET_PLAN = {
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
            "1 scoop Grass-fed Vanilla Whey (or Plant Isolate)",
            "1/2 Blood Orange & Meyer Lemon Zest",
            "1 tbsp Crushed Raw Almonds & Organic Raw Honey"
          ],
          prepTime: "10 mins prep",
          tips: "Pre-soak chia seeds overnight in almond milk with a pinch of turmeric for enhanced curcumin absorption."
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
            "Citrus Herb Vinaigrette (Extra virgin olive oil + fresh lime)"
          ],
          prepTime: "20 mins",
          tips: "Rich in Omega-3 fatty acids to reduce systemic inflammation and support brain clarity."
        },
        {
          id: "mon-snack",
          type: "Afternoon Snack",
          time: "04:30 PM",
          title: "Organic Greek Yogurt with Pomegranate & Walnuts",
          calories: 280,
          protein: 22,
          carbs: 24,
          fats: 10,
          fiber: 4,
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
          ingredients: [
            "1 cup 2% Plain Greek Yogurt",
            "2 tbsp Fresh Pomegranate Arils",
            "15g Raw Chopped Walnuts",
            "Ground Ceylon Cinnamon"
          ],
          prepTime: "3 mins",
          tips: "Provides sustained amino acid release and polyphenol antioxidants before your evening workout."
        },
        {
          id: "mon-dinner",
          type: "Dinner",
          time: "07:30 PM",
          title: "Herb-Roasted Lemon Chicken with Asparagus & Sweet Yam",
          calories: 700,
          protein: 59,
          carbs: 76,
          fats: 13,
          fiber: 10,
          image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600",
          ingredients: [
            "200g Organic Pasture-Raised Chicken Breast",
            "1 medium Roasted Japanese Sweet Potato",
            "8 spears Roasted Green Asparagus with Garlic",
            "1 tsp Avocado Oil & Rosemary Sprigs"
          ],
          prepTime: "25 mins",
          tips: "Slow-digesting complex carbs in dinner help facilitate serotonin production for restorative deep sleep."
        }
      ]
    },
    "Tuesday": {
      summary: "Clean Lean Proteins & Antioxidant-Rich Greens Focus",
      totalCalories: 2110,
      meals: [
        {
          id: "tue-breakfast",
          type: "Breakfast",
          time: "08:00 AM",
          title: "Poached Eggs on Sourdough with Herbed Labneh",
          calories: 480,
          protein: 28,
          carbs: 46,
          fats: 18,
          fiber: 6,
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600",
          ingredients: [
            "2 Large Pasture-Raised Eggs poached",
            "1 slice Artisanal Fermented Sourdough toast",
            "2 tbsp Cultured Herbed Labneh or Goat Cheese",
            "1 cup Sautéed Baby Kale in Olive Oil"
          ],
          prepTime: "12 mins",
          tips: "Naturally fermented sourdough is gentler on digestion and maintains stable glycemic balance."
        },
        {
          id: "tue-lunch",
          type: "Lunch",
          time: "01:00 PM",
          title: "Mediterranean Tuna & Chickpea Power Salad",
          calories: 640,
          protein: 52,
          carbs: 58,
          fats: 22,
          fiber: 14,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
          ingredients: [
            "1 can Wild Albacore Tuna in olive oil drained",
            "3/4 cup Organic Cooked Chickpeas",
            "Cucumbers, Cherry Tomatoes, Kalamata Olives",
            "Fresh Dill, Lemon Juice & Extra Virgin Olive Oil"
          ],
          prepTime: "10 mins",
          tips: "High dietary fiber from chickpeas supports healthy gut microbiome diversity."
        },
        {
          id: "tue-snack",
          type: "Afternoon Snack",
          time: "04:30 PM",
          title: "Matcha Vitality Protein Smoothie",
          calories: 270,
          protein: 25,
          carbs: 22,
          fats: 7,
          fiber: 5,
          image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600",
          ingredients: [
            "1 tsp Ceremonial Grade Japanese Matcha",
            "1 scoop Vanilla Collagen/Whey Protein",
            "1 cup Oat Milk & 1/2 Frozen Banana",
            "Handful Organic Baby Spinach"
          ],
          prepTime: "5 mins",
          tips: "L-theanine in matcha provides sustained calm focus without caffeine jitters."
        },
        {
          id: "tue-dinner",
          type: "Dinner",
          time: "07:30 PM",
          title: "Grass-Fed Beef Sirloin with Roasted Cauliflower & Chimichurri",
          calories: 720,
          protein: 55,
          carbs: 35,
          fats: 36,
          fiber: 8,
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
          ingredients: [
            "180g Grass-Fed Beef Sirloin steak seared",
            "1.5 cups Roasted Turmeric Cauliflower florets",
            "2 tbsp Fresh Parsley & Oregano Chimichurri",
            "1/2 cup Steamed Wild Rice"
          ],
          prepTime: "25 mins",
          tips: "Excellent bioavailable heme iron and zinc for cellular energy and immune resilience."
        }
      ]
    },
    "Wednesday": {
      summary: "Plant-Forward Vitality & Micronutrient Density",
      totalCalories: 2150,
      meals: [
        {
          id: "wed-breakfast",
          type: "Breakfast",
          time: "08:00 AM",
          title: "Berry Bliss Acai & Hemp Seed Wellness Bowl",
          calories: 450,
          protein: 24,
          carbs: 62,
          fats: 12,
          fiber: 14,
          image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600",
          ingredients: ["Pure Unsweetened Acai Puree", "1 scoop Plant Protein", "Organic Blueberries", "2 tbsp Raw Shelled Hemp Hearts"],
          prepTime: "8 mins",
          tips: "Loaded with anthocyanins that support vascular elasticity."
        },
        {
          id: "wed-lunch",
          type: "Lunch",
          time: "01:00 PM",
          title: "Grilled Turkey & Rainbow Veggie Tahini Wrap",
          calories: 670,
          protein: 50,
          carbs: 60,
          fats: 24,
          fiber: 11,
          image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600",
          ingredients: ["180g Roasted Turkey Breast slices", "Sprouted Grain Tortilla", "Shredded Carrots, Cabbage & Romaine", "2 tbsp Sesame Tahini Dressing"],
          prepTime: "12 mins",
          tips: "Sesame tahini is a powerhouse of calcium and healthy monounsaturated fats."
        },
        {
          id: "wed-snack",
          type: "Afternoon Snack",
          time: "04:30 PM",
          title: "Raw Almond Butter with Crisp Honeycrisp Apple",
          calories: 290,
          protein: 9,
          carbs: 32,
          fats: 16,
          fiber: 7,
          image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&q=80&w=600",
          ingredients: ["1 Crisp Organic Apple sliced", "2 tbsp Natural Stone-Ground Almond Butter", "Dash of sea salt"],
          prepTime: "2 mins",
          tips: "Pectin fiber combined with healthy fats buffers blood glucose spikes."
        },
        {
          id: "wed-dinner",
          type: "Dinner",
          time: "07:30 PM",
          title: "Pan-Roasted Halibut with Lemon Capers & Zucchini Noodles",
          calories: 740,
          protein: 62,
          carbs: 38,
          fats: 26,
          fiber: 9,
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
          ingredients: ["200g Wild Pacific Halibut fillet", "2 cups Fresh Spiralized Zucchini noodles", "1/2 cup Roasted Baby Gold Potatoes", "Lemon Butter Caper Reduction"],
          prepTime: "20 mins",
          tips: "Ultra-lean white fish with high selenium and potassium levels."
        }
      ]
    },
    "Thursday": {
      summary: "Balanced Carb Cycling & Muscle Recovery Day",
      totalCalories: 2130,
      meals: [
        {
          id: "thu-breakfast",
          type: "Breakfast",
          time: "08:00 AM",
          title: "Cottage Cheese & Honey Roasted Fig Toast",
          calories: 470,
          protein: 30,
          carbs: 52,
          fats: 13,
          fiber: 7,
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600",
          ingredients: ["1 cup Organic Low-Fat Cottage Cheese", "2 slices Sprouted Ezekiel Toast", "Fresh Figs sliced", "Raw Honey Drizzle"],
          prepTime: "7 mins",
          tips: "Slow-digesting casein protein supports muscle protein synthesis throughout the morning."
        },
        {
          id: "thu-lunch",
          type: "Lunch",
          time: "01:00 PM",
          title: "Moroccan Spiced Lentil & Shredded Chicken Bowl",
          calories: 690,
          protein: 54,
          carbs: 64,
          fats: 20,
          fiber: 16,
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
          ingredients: ["180g Slow-cooked Pulled Chicken Breast", "3/4 cup Spiced French Green Lentils", "Roasted Butternut Squash cubes", "Cumin Greek Yogurt Sauce"],
          prepTime: "15 mins",
          tips: "Lentils are packed with prebiotic fibers and resistant starches."
        },
        {
          id: "thu-snack",
          type: "Afternoon Snack",
          time: "04:30 PM",
          title: "Boutique Raw Trail Mix with Goji Berries & Cacao Nibs",
          calories: 260,
          protein: 9,
          carbs: 21,
          fats: 17,
          fiber: 6,
          image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600",
          ingredients: ["Raw Macadamia nuts", "Raw Pumpkin seeds", "Wild Goji berries", "Raw Cacao nibs"],
          prepTime: "1 min",
          tips: "Cacao nibs deliver theobromine and magnesium for mental stamina."
        },
        {
          id: "thu-dinner",
          type: "Dinner",
          time: "07:30 PM",
          title: "Herb Baked Cod with Mediterranean Ratatouille",
          calories: 710,
          protein: 57,
          carbs: 42,
          fats: 24,
          fiber: 10,
          image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600",
          ingredients: ["220g Atlantic Cod loin", "Eggplant, Zucchini, Bell Peppers stewed with herbs", "1/2 cup Jasmine Brown Rice"],
          prepTime: "30 mins",
          tips: "Ratatouille delivers rich lycopene and polyphenols."
        }
      ]
    },
    "Friday": {
      summary: "High Energy & Sustained Focus",
      totalCalories: 2180,
      meals: [
        {
          id: "fri-breakfast",
          type: "Breakfast",
          time: "08:00 AM",
          title: "Spinach, Goat Cheese & Sun-Dried Tomato Omelet",
          calories: 490,
          protein: 32,
          carbs: 22,
          fats: 28,
          fiber: 5,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
          ingredients: ["3 Pasture-raised whole eggs", "Fresh baby spinach", "Creamy goat cheese", "Sun-dried tomatoes in olive oil", "1 slice sourdough"],
          prepTime: "12 mins",
          tips: "High choline content in whole egg yolks sharpens cognitive neurotransmitters."
        },
        {
          id: "fri-lunch",
          type: "Lunch",
          time: "01:00 PM",
          title: "Seared Ahi Tuna Bowl with Edamame & Brown Rice",
          calories: 680,
          protein: 56,
          carbs: 62,
          fats: 18,
          fiber: 9,
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
          ingredients: ["180g Sesame-crusted rare Ahi Tuna", "1 cup Steamed Edamame", "3/4 cup Short Grain Brown Rice", "Pickled ginger & tamari lime dressing"],
          prepTime: "15 mins",
          tips: "Leanest fish source for pure, rapid-digesting protein."
        },
        {
          id: "fri-snack",
          type: "Afternoon Snack",
          time: "04:30 PM",
          title: "Vanilla Skyr with Fresh Blueberries & Flaxseed",
          calories: 270,
          protein: 24,
          carbs: 26,
          fats: 6,
          fiber: 5,
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
          ingredients: ["1 cup Icelandic Skyr", "1/2 cup Organic Blueberries", "1 tbsp Freshly ground Golden Flax"],
          prepTime: "3 mins",
          tips: "Lignans in ground flaxseed encourage healthy hormone metabolism."
        },
        {
          id: "fri-dinner",
          type: "Dinner",
          time: "07:30 PM",
          title: "Grilled Bison Steak with Garlic Broccolini & Fingerlings",
          calories: 740,
          protein: 58,
          carbs: 48,
          fats: 28,
          fiber: 8,
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
          ingredients: ["180g Grass-fed American Bison strip", "Grilled Broccolini with garlic chili flakes", "1 cup Roasted fingerling potatoes"],
          prepTime: "25 mins",
          tips: "Bison is significantly lower in fat and higher in iron and CLA than standard beef."
        }
      ]
    },
    "Saturday": {
      summary: "Weekend Rejuvenation & Outdoor Activity Fuel",
      totalCalories: 2200,
      meals: [
        {
          id: "sat-breakfast",
          type: "Breakfast",
          time: "09:00 AM",
          title: "Fluffy Protein Oat Pancakes with Warm Berry Compote",
          calories: 520,
          protein: 36,
          carbs: 68,
          fats: 11,
          fiber: 10,
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600",
          ingredients: ["Oat flour & Egg Whites batter", "Vanilla Protein powder", "Warm simmered raspberries and blackberries", "100% Pure Maple Syrup (1 tbsp)"],
          prepTime: "15 mins",
          tips: "Wholesome weekend brunch that aligns perfectly with fitness goals."
        },
        {
          id: "sat-lunch",
          type: "Lunch",
          time: "01:30 PM",
          title: "Grilled Lemon Herb Shrimp & Mango Avocado Salad",
          calories: 640,
          protein: 46,
          carbs: 44,
          fats: 26,
          fiber: 12,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
          ingredients: ["200g Wild Gulf Jumbo Shrimp", "Fresh Diced Mango & Hass Avocado", "Crisp Romaine & Cilantro", "Lime Jalapeno Vinaigrette"],
          prepTime: "15 mins",
          tips: "Astaxanthin in wild shrimp offers superior photoprotection and antioxidant defense."
        },
        {
          id: "sat-snack",
          type: "Afternoon Snack",
          time: "05:00 PM",
          title: "Creamy Dark Chocolate & Almond Protein Truffles",
          calories: 290,
          protein: 18,
          carbs: 22,
          fats: 14,
          fiber: 6,
          image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600",
          ingredients: ["2 Handmade Protein energy bites with almond butter, Medjool dates, raw cacao, and whey isolate"],
          prepTime: "5 mins",
          tips: "Satisfies sweet cravings with zero refined sugar and high fiber."
        },
        {
          id: "sat-dinner",
          type: "Dinner",
          time: "08:00 PM",
          title: "Cedar Plank Roasted Salmon with Wild Mushrooms & Farro",
          calories: 750,
          protein: 52,
          carbs: 58,
          fats: 32,
          fiber: 9,
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
          ingredients: ["200g Wild King Salmon roasted", "Sautéed Chanterelle and Shiitake mushrooms", "3/4 cup Ancient Grain Farro risotto style"],
          prepTime: "30 mins",
          tips: "Shiitake and chanterelle mushrooms provide beta-glucans for immune strength."
        }
      ]
    },
    "Sunday": {
      summary: "Mindful Reset & Meal Prep Day",
      totalCalories: 2100,
      meals: [
        {
          id: "sun-breakfast",
          type: "Breakfast",
          time: "09:00 AM",
          title: "Smoked Salmon & Poached Eggs with Everything Bagel Seasoning",
          calories: 490,
          protein: 38,
          carbs: 38,
          fats: 20,
          fiber: 6,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
          ingredients: ["120g Wild Smoked Salmon", "2 Organic Poached Eggs", "1 slice Seeded Rye Toast", "Cucumber ribbons and capers"],
          prepTime: "10 mins",
          tips: "Seeded rye contains distinct lignans and slowly digesting carbohydrates."
        },
        {
          id: "sun-lunch",
          type: "Lunch",
          time: "01:30 PM",
          title: "Tuscan White Bean & Shredded Rotisserie Chicken Soup",
          calories: 630,
          protein: 52,
          carbs: 56,
          fats: 18,
          fiber: 14,
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
          ingredients: ["180g Shredded Chicken breast", "1 cup Cannellini beans", "Kale, Carrots, Celery in rich bone broth", "Shaved Pecorino Romano"],
          prepTime: "20 mins",
          tips: "Gelatin and collagen in simmered bone broth repair intestinal lining."
        },
        {
          id: "sun-snack",
          type: "Afternoon Snack",
          time: "04:30 PM",
          title: "Golden Turmeric Spiced Golden Milk Latte with Walnuts",
          calories: 240,
          protein: 10,
          carbs: 16,
          fats: 15,
          fiber: 4,
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
          ingredients: ["Warm Cashew Milk", "Curcumin, ginger, cinnamon, black pepper", "Handful of raw walnuts"],
          prepTime: "5 mins",
          tips: "Anti-inflammatory evening tonic to calm digestion and soothe nervous system."
        },
        {
          id: "sun-dinner",
          type: "Dinner",
          time: "07:30 PM",
          title: "Pan-Seared Organic Turkey Cutlets with Roasted Brussels Sprouts",
          calories: 740,
          protein: 60,
          carbs: 48,
          fats: 26,
          fiber: 12,
          image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600",
          ingredients: ["200g Lean Turkey Breast tenderloins", "1.5 cups Crispy Balsamic Roasted Brussels Sprouts", "1 medium Baked Sweet Potato"],
          prepTime: "25 mins",
          tips: "Sulforaphane in brussels sprouts promotes liver phase II detoxification."
        }
      ]
    }
  },
  nutritionistNotes: [
    "Prioritize drinking 500ml of warm water with lemon or electrolytes within 20 minutes of waking.",
    "Your protein target is calibrated at 1.8g per kg of lean body mass to optimize recovery.",
    "Keep dining intervals around 3.5 - 4 hours to maintain stable insulin sensitivity.",
    "Feel free to swap identical macro ingredients (e.g. Salmon for Halibut or Chicken for Turkey)."
  ]
};
