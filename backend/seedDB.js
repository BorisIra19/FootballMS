require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seedDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB Atlas');

  const exists = await User.findOne({ email: 'user@football.com' });
  if (!exists) {
    await User.create({ name: 'Default User', email: 'user@football.com', password: 'user1234' });
    console.log('✅ users collection created with a default user');
  } else {
    console.log('ℹ️  Default user already exists');
  }

  await mongoose.disconnect();
  console.log('🔌 Disconnected. Check Atlas — football_management database should now be visible.');
}

seedDB().catch(err => {
  console.error('❌ Seed error:', err.message);
  process.exit(1);
});
