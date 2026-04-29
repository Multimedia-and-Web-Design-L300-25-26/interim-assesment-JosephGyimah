const express = require('express');
const router = express.Router();
const {
  getAllCrypto,
  getGainers,
  getNewListings,
  addCrypto,
} = require('../controllers/cryptoController');

// Public routes
router.get('/', getAllCrypto);
router.get('/gainers', getGainers);
router.get('/new', getNewListings);

// Public route for adding crypto (per requirements, no auth needed)
router.post('/', addCrypto);

module.exports = router;
