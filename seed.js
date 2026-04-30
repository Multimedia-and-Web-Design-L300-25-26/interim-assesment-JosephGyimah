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
        price: 851630.74,
        marketCap: 17100000000000,
        image: 'https://cryptoicons.org/api/icon/btc/200',
        change24h: -1.22,
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        price: 25280.90,
        marketCap: 3100000000000,
        image: 'https://cryptoicons.org/api/icon/eth/200',
        change24h: -2.67,
      },
      {
        name: 'Tether',
        symbol: 'USDT',
        price: 11.19,
        marketCap: 2100000000000,
        image: 'https://cryptoicons.org/api/icon/usdt/200',
        change24h: -0.03,
      },
      {
        name: 'Ripple',
        symbol: 'XRP',
        price: 15.38,
        marketCap: 949900000000,
        image: 'https://cryptoicons.org/api/icon/xrp/200',
        change24h: -1.05,
      },
      {
        name: 'BNB',
        symbol: 'BNB',
        price: 6912.28,
        marketCap: 932300000000,
        image: 'https://cryptoicons.org/api/icon/bnb/200',
        change24h: -1.16,
      },
      {
        name: 'USDC',
        symbol: 'USDC',
        price: 11.20,
        marketCap: 864700000000,
        image: 'https://cryptoicons.org/api/icon/usdc/200',
        change24h: 0.00,
      },
      {
        name: 'Solana',
        symbol: 'SOL',
        price: 931.56,
        marketCap: 537600000000,
        image: 'https://cryptoicons.org/api/icon/sol/200',
        change24h: -1.63,
      },
      {
        name: 'TRON',
        symbol: 'TRX',
        price: 3.63,
        marketCap: 344500000000,
        image: 'https://cryptoicons.org/api/icon/trx/200',
        change24h: 0.63,
      },
      {
        name: 'Dogecoin',
        symbol: 'DOGE',
        price: 1.20,
        marketCap: 184500000000,
        image: 'https://cryptoicons.org/api/icon/doge/200',
        change24h: 1.86,
      },
      {
        name: 'Hyperliquid',
        symbol: 'HYPE',
        price: 442.34,
        marketCap: 112900000000,
        image: 'https://cryptoicons.org/api/icon/hype/200',
        change24h: -2.56,
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
