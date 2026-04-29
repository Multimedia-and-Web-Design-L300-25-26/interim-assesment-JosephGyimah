require('dotenv').config();
const mongoose = require('mongoose');
const Cryptocurrency = require('./models/Cryptocurrency');
const connectDB = require('./config/db');

const seedCryptos = async () => {
  try {
    await connectDB();

    // Clear existing cryptocurrencies
    await Cryptocurrency.deleteMany({});

    const cryptos = [
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 45230.50,
        image: 'https://cryptoicons.org/api/icon/btc/200',
        change24h: 2.5,
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        price: 2580.75,
        image: 'https://cryptoicons.org/api/icon/eth/200',
        change24h: 3.2,
      },
      {
        name: 'Cardano',
        symbol: 'ADA',
        price: 0.98,
        image: 'https://cryptoicons.org/api/icon/ada/200',
        change24h: 5.1,
      },
      {
        name: 'Ripple',
        symbol: 'XRP',
        price: 2.45,
        image: 'https://cryptoicons.org/api/icon/xrp/200',
        change24h: -1.2,
      },
      {
        name: 'Solana',
        symbol: 'SOL',
        price: 108.50,
        image: 'https://cryptoicons.org/api/icon/sol/200',
        change24h: 4.8,
      },
      {
        name: 'Polkadot',
        symbol: 'DOT',
        price: 7.52,
        image: 'https://cryptoicons.org/api/icon/dot/200',
        change24h: 1.5,
      },
      {
        name: 'Litecoin',
        symbol: 'LTC',
        price: 152.30,
        image: 'https://cryptoicons.org/api/icon/ltc/200',
        change24h: -0.8,
      },
      {
        name: 'Bitcoin Cash',
        symbol: 'BCH',
        price: 425.60,
        image: 'https://cryptoicons.org/api/icon/bch/200',
        change24h: 2.1,
      },
      {
        name: 'Chainlink',
        symbol: 'LINK',
        price: 28.45,
        image: 'https://cryptoicons.org/api/icon/link/200',
        change24h: 6.3,
      },
      {
        name: 'Uniswap',
        symbol: 'UNI',
        price: 8.90,
        image: 'https://cryptoicons.org/api/icon/uni/200',
        change24h: 3.9,
      },
    ];

    const insertedCryptos = await Cryptocurrency.insertMany(cryptos);
    console.log(`✓ Seeded ${insertedCryptos.length} cryptocurrencies`);
    console.log('Sample cryptocurrencies:');
    insertedCryptos.forEach((crypto) => {
      console.log(`  - ${crypto.name} (${crypto.symbol}): $${crypto.price}`);
    });

    mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedCryptos();
