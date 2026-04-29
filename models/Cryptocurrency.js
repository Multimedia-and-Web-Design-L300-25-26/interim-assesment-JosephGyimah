const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a cryptocurrency name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    symbol: {
      type: String,
      required: [true, 'Please provide a cryptocurrency symbol'],
      trim: true,
      uppercase: true,
      maxlength: [10, 'Symbol cannot be more than 10 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    change24h: {
      type: Number,
      required: [true, 'Please provide 24h change percentage'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cryptocurrency', cryptoSchema);
