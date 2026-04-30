const Cryptocurrency = require('../models/Cryptocurrency');

// @route   GET /crypto
// @desc    Get all cryptocurrencies
// @access  Public
exports.getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Cryptocurrency.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error fetching cryptocurrencies',
    });
  }
};

// @route   GET /crypto/gainers
// @desc    Get top gainers sorted by highest 24h change
// @access  Public
exports.getGainers = async (req, res) => {
  try {
    const gainers = await Cryptocurrency.find()
      .sort({ change24h: -1 });

    res.status(200).json({
      success: true,
      count: gainers.length,
      data: gainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error fetching gainers',
    });
  }
};

// @route   GET /crypto/new
// @desc    Get newly added cryptocurrencies
// @access  Public
exports.getNewListings = async (req, res) => {
  try {
    const newListings = await Cryptocurrency.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: newListings.length,
      data: newListings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error fetching new listings',
    });
  }
};

// @route   POST /crypto
// @desc    Add a new cryptocurrency
// @access  Private (optional - can be public per requirements)
exports.addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h, marketCap } = req.body;

    // Validate input
    if (!name || !symbol || price === undefined || !image || change24h === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, symbol, price, image, and 24h change percentage',
      });
    }

    const normalizedMarketCap = marketCap === undefined || marketCap === null || marketCap === '' ? 0 : Number(marketCap);

    if (Number.isNaN(normalizedMarketCap) || normalizedMarketCap < 0) {
      return res.status(400).json({
        success: false,
        error: 'Market cap must be a valid non-negative number',
      });
    }

    // Check if cryptocurrency already exists
    let crypto = await Cryptocurrency.findOne({ symbol });
    if (crypto) {
      return res.status(400).json({
        success: false,
        error: 'Cryptocurrency with this symbol already exists',
      });
    }

    // Create cryptocurrency
    crypto = await Cryptocurrency.create({
      name,
      symbol,
      price,
      image,
      change24h,
      marketCap: normalizedMarketCap,
    });

    res.status(201).json({
      success: true,
      message: 'Cryptocurrency added successfully',
      data: crypto,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Server error adding cryptocurrency',
    });
  }
};
