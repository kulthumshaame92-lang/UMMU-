import http from 'http';
import app from './server.js';

const PORT = 5099;
let server;

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const reqHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    if (dataString) {
      reqHeaders['Content-Length'] = Buffer.byteLength(dataString);
    }

    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: encodeURI(path),
        method,
        headers: reqHeaders
      },
      (res) => {
        let resData = '';
        res.on('data', chunk => { resData += chunk; });
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(resData);
          } catch {
            parsed = resData;
          }
          resolve({ status: res.statusCode, data: parsed });
        });
      }
    );

    req.on('error', err => reject(err));
    if (dataString) {
      req.write(dataString);
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting NutriCare Hub Backend API Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, name, details = '') {
    if (condition) {
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${name} ${details}`);
      failed++;
    }
  }

  // Start temporary test server
  await new Promise((resolve) => {
    server = app.listen(PORT, () => {
      console.log(`📡 Test server running on http://127.0.0.1:${PORT}\n`);
      resolve();
    });
  });

  try {
    // 1. Health Check
    const health = await request('GET', '/api/health');
    assert(health.status === 200 && health.data.status === 'healthy', 'GET /api/health returns 200 OK');

    // 2. Auth - Register new test user
    const testEmail = `test_${Date.now()}@example.com`;
    const regRes = await request('POST', '/api/auth/register', {
      name: 'Jordan Lee',
      email: testEmail,
      password: 'SecurePassword123!',
      role: 'client'
    });
    assert(regRes.status === 201 && regRes.data.token, 'POST /api/auth/register creates user and returns JWT token');
    const userToken = regRes.data.token;

    // 3. Auth - Login
    const loginRes = await request('POST', '/api/auth/login', {
      email: testEmail,
      password: 'SecurePassword123!'
    });
    assert(loginRes.status === 200 && loginRes.data.user.email === testEmail, 'POST /api/auth/login authenticates user');

    // 4. Auth - Get Current User
    const meRes = await request('GET', '/api/auth/me', null, { Authorization: `Bearer ${userToken}` });
    assert(meRes.status === 200 && meRes.data.user.name === 'Jordan Lee', 'GET /api/auth/me returns authenticated user');

    // 5. Nutrition Assessment Engine (Clinical calculations)
    const assessRes = await request('POST', '/api/assessments', {
      age: 30,
      gender: 'male',
      heightCm: 180,
      weightKg: 80,
      targetWeightKg: 75,
      activityLevel: 'moderately_active',
      primaryGoal: 'weight_loss',
      dietaryPreference: 'Mediterranean High-Protein'
    }, { Authorization: `Bearer ${userToken}` });

    assert(
      assessRes.status === 201 &&
      assessRes.data.assessment.calculated.bmi > 0 &&
      assessRes.data.assessment.calculated.bmr > 0 &&
      assessRes.data.assessment.calculated.targetCalories > 0 &&
      assessRes.data.assessment.calculated.macros.proteinGrams > 0,
      'POST /api/assessments calculates BMI, BMR, TDEE, Calories, and Protein/Carb/Fat macros'
    );

    // 6. Nutritionists - List & Detail
    const nutrList = await request('GET', '/api/nutritionists');
    assert(nutrList.status === 200 && nutrList.data.nutritionists.length > 0, 'GET /api/nutritionists returns dietitian list');

    const firstNutrId = nutrList.data.nutritionists[0].id;
    const nutrDetail = await request('GET', `/api/nutritionists/${firstNutrId}`);
    assert(nutrDetail.status === 200 && nutrDetail.data.nutritionist.id === firstNutrId, 'GET /api/nutritionists/:id returns dietitian details');

    // 7. Nutritionists - Add Review
    const reviewRes = await request('POST', `/api/nutritionists/${firstNutrId}/reviews`, {
      rating: 5,
      comment: 'Exceptional personalized protocol and clinical guidance!'
    }, { Authorization: `Bearer ${userToken}` });
    assert(reviewRes.status === 201 && reviewRes.data.success, 'POST /api/nutritionists/:id/reviews submits client review');

    // 8. Diet Plans - Get Active & Swap Meal
    const planRes = await request('GET', '/api/diet-plans/active');
    assert(planRes.status === 200 && planRes.data.plan.macros, 'GET /api/diet-plans/active returns active weekly plan');

    // 9. Recipes - List, Filter & Search
    const recipesRes = await request('GET', '/api/recipes?category=High Protein');
    assert(recipesRes.status === 200 && recipesRes.data.recipes.length > 0, 'GET /api/recipes with category filter returns matching recipes');

    // 10. Recipes - Favorite
    const favRes = await request('POST', '/api/recipes/rec-1/favorite', null, { Authorization: `Bearer ${userToken}` });
    assert(favRes.status === 200 && favRes.data.isFavorite !== undefined, 'POST /api/recipes/:id/favorite toggles favorite');

    // 11. Bookings - Create appointment
    const bookRes = await request('POST', '/api/bookings', {
      clientName: 'Jordan Lee',
      clientEmail: testEmail,
      nutritionistId: firstNutrId,
      tierId: 'initial-eval',
      notes: 'Focus on metabolic acceleration.'
    }, { Authorization: `Bearer ${userToken}` });
    assert(bookRes.status === 201 && bookRes.data.booking.meetingLink, 'POST /api/bookings creates appointment with video link');

    // 12. Education - Articles
    const eduRes = await request('GET', '/api/education');
    assert(eduRes.status === 200 && eduRes.data.articles.length > 0, 'GET /api/education returns evidence-based articles');

    // 13. Payments & Checkout
    const payRes = await request('POST', '/api/payments/checkout', {
      amount: 180,
      description: 'Initial Assessment Tier Booking',
      promoCode: 'NUTRI20'
    }, { Authorization: `Bearer ${userToken}` });
    assert(payRes.status === 201 && payRes.data.payment.discountApplied > 0, 'POST /api/payments/checkout applies discount code and generates invoice');

    // 14. Progress Tracking
    const progRes = await request('POST', '/api/progress/log', {
      weightKg: 79.5,
      caloriesConsumed: 2150,
      proteinGrams: 155,
      waterLiters: 3.5,
      notes: 'Morning run completed and hit all protein targets.'
    }, { Authorization: `Bearer ${userToken}` });
    assert(progRes.status === 201 && progRes.data.log.weightKg === 79.5, 'POST /api/progress/log records daily biometric log');

    // 15. Admin Metrics
    const adminRes = await request('GET', '/api/admin/metrics');
    assert(adminRes.status === 200 && adminRes.data.metrics.totalUsers > 0, 'GET /api/admin/metrics returns system-wide metrics');

  } catch (error) {
    console.error('Test execution error:', error);
    failed++;
  } finally {
    server.close();
    console.log(`\n========================================`);
    console.log(`🏁 Test Summary: ${passed} Passed, ${failed} Failed`);
    console.log(`========================================\n`);
    if (failed > 0) process.exit(1);
  }
}

runTests();
