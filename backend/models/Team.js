const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  logo: { type: String, default: '' },
  city: { type: String, required: true, trim: true },
  founded: { type: Number },
  stadium: { type: String, trim: true },
  coach: { type: String, trim: true },
  leagueId: { type: mongoose.Schema.Types.ObjectId, ref: 'League', default: null },
  wins: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  goalsFor: { type: Number, default: 0 },
  goalsAgainst: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
}, { timestamps: true });

teamSchema.index({ leagueId: 1 });
teamSchema.index({ points: -1 });

module.exports = mongoose.model('Team', teamSchema);
