const { validationResult } = require('express-validator');
const Inquiry = require('../models/Inquiry');
const { sendInquiryEmail } = require('../config/mailer');

// POST /api/contact
exports.submitInquiry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, service, budget, message } = req.body;

    const inquiry = await Inquiry.create({ name, email, phone, service, budget, message });

    // Send email notification to admin
    await sendInquiryEmail({ name, email, phone, service, budget, message });

    res.status(201).json({
      success: true,
      message: 'Thank you! We will get back to you within 24 hours.',
      data: { id: inquiry._id }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry. Please try again.' });
  }
};
