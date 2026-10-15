const express = require('express');
const { body } = require('express-validator');
const {
  createEnquiry,
  getUnclaimed,
  claimEnquiry,
  getMyClaimed,
} = require('../controllers/enquiryController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

const router = express.Router();

// Public route - no auth
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('phone').optional().trim(),
    body('courseInterest').trim().notEmpty().withMessage('Course interest is required'),
  ],
  validate,
  createEnquiry
);

// Protected routes - JWT required
router.get('/unclaimed', auth, getUnclaimed);
router.get('/my-claimed', auth, getMyClaimed);
router.patch('/:id/claim', auth, claimEnquiry);

module.exports = router;