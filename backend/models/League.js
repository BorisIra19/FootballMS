const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  country: { type: String, required: true, trim: true },
  season: { type: String, required: true, trim: true },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['Active', 'Completed', 'Upcoming'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('League', leagueSchema);
