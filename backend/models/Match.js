const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  leagueId: { type: mongoose.Schema.Types.ObjectId, ref: 'League', default: null },
  date: { type: Date, required: true },
  venue: { type: String, trim: true },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  status: { type: String, enum: ['Scheduled', 'Live', 'Completed', 'Postponed'], default: 'Scheduled' },
  round: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
