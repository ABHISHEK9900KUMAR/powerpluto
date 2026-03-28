const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  service: {
    type: String,
    enum: ['Website Development', 'Mobile App Development', 'Web Application', 'POS System', 'Other'],
    required: [true, 'Service type is required']
  },
  budget: {
    type: String,
    enum: ['$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+', 'Not sure']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ['new', 'in_review', 'contacted', 'closed'],
    default: 'new'
  },
  notes: {
    type: String,
    maxlength: 1000
  }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
