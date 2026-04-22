const router = require('express').Router();
const Team = require('../models/Team');
const Player = require('../models/Player');
const Match = require('../models/Match');
const League = require('../models/League');

router.get('/', async (req, res) => {
  try {
    const [totalTeams, totalPlayers, totalMatches, totalLeagues, recentMatches, topScorers, upcomingMatches] = await Promise.all([
      Team.countDocuments(),
      Player.countDocuments(),
      Match.countDocuments(),
      League.countDocuments(),
      Match.find({ status: 'Completed' })
        .populate('homeTeam', 'name')
        .populate('awayTeam', 'name')
        .sort({ date: -1 })
        .limit(5),
      Player.find({ goals: { $gt: 0 } }).sort({ goals: -1 }).limit(5).populate('teamId', 'name'),
      Match.find({ status: 'Scheduled', date: { $gte: new Date() } })
        .populate('homeTeam', 'name')
        .populate('awayTeam', 'name')
        .sort({ date: 1 })
        .limit(5),
    ]);

    res.json({ totalTeams, totalPlayers, totalMatches, totalLeagues, recentMatches, topScorers, upcomingMatches });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
