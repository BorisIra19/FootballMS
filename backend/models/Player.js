const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
  position: { type: String, enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'], required: true },
  nationality: { type: String, trim: true },
  age: { type: Number },
  jerseyNumber: { type: Number },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  yellowCards: { type: Number, default: 0 },
  redCards: { type: Number, default: 0 },
  appearances: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Injured', 'Suspended'], default: 'Active' },
}, { timestamps: true });

playerSchema.index({ teamId: 1 });
playerSchema.index({ goals: -1 });

module.exports = mongoose.model('Player', playerSchema);
