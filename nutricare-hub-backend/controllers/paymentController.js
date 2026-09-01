import { db } from '../data/store.js';

export const processCheckout = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    const {
      itemType = 'consultation', // 'consultation' | 'diet_plan' | 'subscription'
      itemId,
      amount,
      currency = 'USD',
      description,
      promoCode,
      paymentMethod = 'Credit Card'
    } = req.body;

    let finalAmount = Number(amount) || 100;
    let discountApplied = 0;

    // Apply sample promo codes
    if (promoCode && promoCode.toUpperCase() === 'NUTRI20') {
      discountApplied = Math.round(finalAmount * 0.20);
      finalAmount = Math.max(0, finalAmount - discountApplied);
    } else if (promoCode && promoCode.toUpperCase() === 'WELCOME10') {
      discountApplied = 10;
      finalAmount = Math.max(0, finalAmount - 10);
    }

    const newPayment = db.insert('payments', {
      userId,
      itemType,
      itemId,
      originalAmount: Number(amount) || 100,
      discountApplied,
      amount: finalAmount,
      currency,
      description: description || 'NutriCare Health Service Checkout',
      status: 'completed',
      paymentMethod,
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      receiptUrl: `https://billing.nutricarehub.com/receipt/inv-${Date.now().toString().slice(-6)}`
    });

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully.',
      payment: newPayment
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentHistory = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    let list = db.get('payments');

    if (req.user && req.user.role !== 'admin') {
      list = list.filter(p => p.userId === userId);
    }

    list = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: list.length,
      payments: list
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = db.findById('payments', id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: `Payment record with ID '${id}' was not found.`
      });
    }

    res.json({
      success: true,
      payment
    });
  } catch (error) {
    next(error);
  }
};
