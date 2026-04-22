const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/players', require('./routes/players'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/leagues', require('./routes/leagues'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));

async function seedAdmin() {
  const Admin = require('./models/Admin');
  const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!exists) {
    await Admin.create({ name: 'Admin', email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
    console.log('✅ Admin seeded:', process.env.ADMIN_EMAIL);
  }
}

async function seedUser() {
  const User = require('./models/User');
  const exists = await User.findOne({ email: 'user@football.com' });
  if (!exists) {
    await User.create({ name: 'Default User', email: 'user@football.com', password: 'user1234' });
    console.log('✅ Default user seeded');
  }
}

mongoose.connect(process.env.MONGO_URI, { maxPoolSize: 10 })
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas');
    await Promise.all([seedAdmin(), seedUser()]);
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
