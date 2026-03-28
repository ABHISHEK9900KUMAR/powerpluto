const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { submitInquiry } = require('../controllers/contactController');

// Strict rate limit for contact form — 5 submissions per hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many submissions from this IP, please try again after an hour.' }
});

const validateInquiry = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional().trim().isLength({ max: 20 }),
  body('service').notEmpty().withMessage('Service type is required')
    .isIn(['Website Development', 'Mobile App Development', 'Web Application', 'POS System', 'Other']),
  body('budget').optional()
    .isIn(['$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+', 'Not sure']),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 })
];

router.post('/', contactLimiter, validateInquiry, submitInquiry);

module.exports = router;
