# NutriCare Hub - Node.js REST API Backend 🌿

Production-ready Express.js backend for the NutriCare Hub digital platform.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd nutricare-hub-backend
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Run Automated Tests
```bash
npm test
```

---

## 📚 API Endpoints Summary

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new client or nutritionist account with hashed credentials. |
| `POST` | `/api/auth/login` | Authenticate credentials and return JWT bearer token. |
| `GET` | `/api/auth/me` | Fetch authenticated user profile and biometrics. |
| `PUT` | `/api/auth/profile` | Update profile information, targets, and dietary preferences. |

### 🩺 Nutrition Assessment Engine (`/api/assessments`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/assessments` | Submit multi-step health assessment. Calculates BMI, BMR (Mifflin-St Jeor), TDEE, custom macro distribution, and plan blueprint. |
| `GET` | `/api/assessments/latest` | Retrieve user's latest clinical assessment results. |
| `GET` | `/api/assessments/history` | Retrieve historical assessment submissions. |

### 👩‍⚕️ Nutritionists & Dietitians (`/api/nutritionists`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/nutritionists` | List nutritionists with query filters (`specialty`, `minRating`, `search`). |
| `GET` | `/api/nutritionists/:id` | Full profile, credentials, consultation packages, and client reviews. |
| `GET` | `/api/nutritionists/:id/slots`| Available video consultation slots. |
| `POST` | `/api/nutritionists/:id/reviews` | Submit client review and star rating. |

### 🥗 Personalized Diet Plans (`/api/diet-plans`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/diet-plans/active` | Retrieve active 7-day personalized meal plan with daily macro breakdown. |
| `GET` | `/api/diet-plans/:id` | Retrieve specific diet plan by ID. |
| `POST` | `/api/diet-plans/swap-meal`| Dynamically swap a planned meal with another recipe. |
| `POST` | `/api/diet-plans` | Create a custom diet plan blueprint (Nutritionist/Admin). |

### 🍲 Recipes Discovery (`/api/recipes`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/recipes` | Search & filter recipes by category, dietary tags (`Keto`, `Vegan`, `Gluten-Free`), and calories. |
| `GET` | `/api/recipes/favorites`| List user's bookmarked recipes. |
| `GET` | `/api/recipes/:id` | Full recipe ingredients, instructions, and macro breakdown. |
| `POST` | `/api/recipes/:id/favorite` | Toggle bookmark on a recipe. |

### 📅 Consultation Bookings (`/api/bookings`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/bookings` | List user's consultation appointments. |
| `POST` | `/api/bookings` | Book consultation slot with chosen dietitian and tier package. |
| `PATCH` | `/api/bookings/:id/status` | Reschedule or cancel booking. |

### 📖 Evidence-Based Education (`/api/education`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/education` | Clinical nutrition articles, guides, and research summaries. |
| `GET` | `/api/education/:id` | Read full article content. |

### 💳 Payments & Invoicing (`/api/payments`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/payments/checkout` | Process plan/consultation payment with promo code discount support (`NUTRI20`). |
| `GET` | `/api/payments/history` | List user transaction receipts and invoices. |

### 📈 Progress Tracking (`/api/progress`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/progress/log` | Record daily weight, consumed calories, macro adherence, and water intake. |
| `GET` | `/api/progress/history` | Historical logs for time-series charts. |
| `GET` | `/api/progress/summary` | Aggregated trends and total delta weight. |

### ⚙️ Admin Control (`/api/admin`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/metrics` | System analytics (total users, active diet plans, revenue, bookings). |
| `GET` | `/api/admin/users` | List platform users. |
| `GET` | `/api/admin/transactions` | Full ledger of platform payments. |

---

## 💾 Storage
Data is persisted in `data/db.json` with synchronous in-memory read caching and safe file writes. Zero external database installations are required.
