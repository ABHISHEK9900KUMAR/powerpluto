const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  login,
  setup,
  getInquiries,
  getInquiry,
  updateInquiry,
  getStats
} = require('../controllers/adminController');

// Auth
router.post('/setup', setup);
router.post('/login', login);

// Protected routes
router.get('/stats', protect, getStats);
router.get('/inquiries', protect, getInquiries);
router.get('/inquiries/:id', protect, getInquiry);
router.patch('/inquiries/:id', protect, updateInquiry);

module.exports = router;
