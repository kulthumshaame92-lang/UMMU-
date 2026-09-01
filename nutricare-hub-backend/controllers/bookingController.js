import { db } from '../data/store.js';

export const getBookings = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    let bookings = db.get('bookings');

    if (req.user?.role === 'client') {
      bookings = bookings.filter(b => b.userId === userId);
    } else if (req.user?.role === 'nutritionist') {
      bookings = bookings.filter(b => b.nutritionistId === req.user.nutritionistProfileId);
    }

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    next(error);
  }
};

export const createBooking = (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : 'user-demo';
    const {
      clientName,
      clientEmail,
      clientPhone,
      nutritionistId,
      tierId,
      appointmentDate,
      notes
    } = req.body;

    const nutritionist = db.findById('nutritionists', nutritionistId);
    if (!nutritionist) {
      return res.status(404).json({
        success: false,
        message: `Nutritionist with ID '${nutritionistId}' not found.`
      });
    }

    const tier = nutritionist.consultationTiers.find(t => t.id === tierId) || nutritionist.consultationTiers[0];

    const newBooking = db.insert('bookings', {
      userId,
      clientName: clientName || req.user?.name || 'Valued Client',
      clientEmail: clientEmail || req.user?.email || 'client@example.com',
      clientPhone: clientPhone || '',
      nutritionistId: nutritionist.id,
      nutritionistName: nutritionist.name,
      tierId: tier.id,
      tierName: tier.name,
      appointmentDate: appointmentDate || new Date(Date.now() + 86400000 * 3).toISOString(),
      duration: tier.duration,
      amountPaid: tier.price,
      currency: tier.currency || 'USD',
      status: 'confirmed',
      meetingLink: `https://meet.nutricarehub.com/session-${Date.now().toString(36)}`,
      notes: notes || 'Initial intake notes.'
    });

    // Create corresponding payment receipt entry
    db.insert('payments', {
      userId,
      bookingId: newBooking.id,
      amount: tier.price,
      currency: tier.currency || 'USD',
      description: `${tier.name} with ${nutritionist.name}`,
      itemType: 'consultation',
      status: 'completed',
      paymentMethod: 'Credit Card',
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`
    });

    res.status(201).json({
      success: true,
      message: 'Consultation appointment booked and confirmed successfully.',
      booking: newBooking
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingById = (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = db.findById('bookings', id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID '${id}' not found.`
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rescheduleDate } = req.body;

    const booking = db.findById('bookings', id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    const updates = { status: status || booking.status };
    if (rescheduleDate) {
      updates.appointmentDate = rescheduleDate;
    }

    const updated = db.update('bookings', id, updates);

    res.json({
      success: true,
      message: 'Booking updated successfully.',
      booking: updated
    });
  } catch (error) {
    next(error);
  }
};
