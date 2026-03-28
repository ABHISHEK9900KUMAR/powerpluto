const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const protect = require('../middleware/auth');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/portfolioController');

const validateProject = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }),
  body('category').notEmpty().withMessage('Category is required')
    .isIn(['Website', 'Mobile App', 'Web App', 'POS']),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 500 })
];

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected routes (admin only)
router.post('/', protect, validateProject, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
