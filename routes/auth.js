const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getProfile,
} = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

// Public routes
router.get('/register', register);
router.post('/register', register);
router.get('/login', login);
router.post('/login', login);

// Private routes
router.post('/logout', verifyToken, logout);
router.get('/profile', verifyToken, getProfile);

module.exports = router;
