const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Inquiry = require('../models/Inquiry');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/admin/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required.' });

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    const token = signToken(admin._id);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed.' });
  }
};

// POST /api/admin/setup — one-time admin creation (disable after first use)
exports.setup = async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0)
      return res.status(403).json({ success: false, message: 'Admin already exists.' });

    const { email, password } = req.body;
    const admin = await Admin.create({ email, password });
    const token = signToken(admin._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Setup failed.' });
  }
};

// GET /api/admin/inquiries
exports.getInquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Inquiry.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: inquiries,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch inquiries.' });
  }
};

// GET /api/admin/inquiries/:id
exports.getInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch inquiry.' });
  }
};

// PATCH /api/admin/inquiries/:id — update status or add notes
exports.updateInquiry = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(notes && { notes }) },
      { new: true, runValidators: true }
    );
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update inquiry.' });
  }
};

// GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const [total, newCount, inReview, contacted, closed] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Inquiry.countDocuments({ status: 'in_review' }),
      Inquiry.countDocuments({ status: 'contacted' }),
      Inquiry.countDocuments({ status: 'closed' })
    ]);

    res.json({
      success: true,
      data: { total, new: newCount, in_review: inReview, contacted, closed }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats.' });
  }
};
