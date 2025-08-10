import 'dotenv/config';
import mongoose from 'mongoose';

// Example schema and model
const coinSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number,
});
const Coin = mongoose.model('Coin', coinSchema);

// Example seed data
const coins = [
  { name: 'Bitcoin', symbol: 'BTC', price: 65000 },
  { name: 'Ethereum', symbol: 'ETH', price: 3500 },
  { name: 'VitaCoin', symbol: 'VITA', price: 1 },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Coin.deleteMany({});
  await Coin.insertMany(coins);
  console.log('Seeded coins!');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
