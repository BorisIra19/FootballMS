const router = require('express').Router();
const Match = require('../models/Match');
const Team = require('../models/Team');

const populate = q => q.populate('homeTeam', 'name city').populate('awayTeam', 'name city').populate('leagueId', 'name');

router.get('/', async (req, res) => {
  try {
    const matches = await populate(Match.find().sort({ date: -1 }));
    res.json(matches);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    if (req.body.homeTeam === req.body.awayTeam) return res.status(400).json({ error: 'Home and away teams must be different' });
    const match = new Match(req.body);
    await match.save();
    const populated = await populate(Match.findById(match._id));
    res.status(201).json(populated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const prev = await Match.findById(req.params.id);
    if (!prev) return res.status(404).json({ error: 'Match not found' });

    const match = await populate(Match.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }));

    // Update team stats only when transitioning to Completed
    if (req.body.status === 'Completed' && prev.status !== 'Completed') {
      const { homeTeam, awayTeam } = match;
      const hs = req.body.homeScore ?? 0;
      const as = req.body.awayScore ?? 0;

      if (hs > as) {
        await Team.findByIdAndUpdate(homeTeam._id, { $inc: { wins: 1, points: 3, goalsFor: hs, goalsAgainst: as } });
        await Team.findByIdAndUpdate(awayTeam._id, { $inc: { losses: 1, goalsFor: as, goalsAgainst: hs } });
      } else if (hs < as) {
        await Team.findByIdAndUpdate(awayTeam._id, { $inc: { wins: 1, points: 3, goalsFor: as, goalsAgainst: hs } });
        await Team.findByIdAndUpdate(homeTeam._id, { $inc: { losses: 1, goalsFor: hs, goalsAgainst: as } });
      } else {
        await Team.findByIdAndUpdate(homeTeam._id, { $inc: { draws: 1, points: 1, goalsFor: hs, goalsAgainst: as } });
        await Team.findByIdAndUpdate(awayTeam._id, { $inc: { draws: 1, points: 1, goalsFor: as, goalsAgainst: hs } });
      }
    }

    res.json(match);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match not found' });
    res.json({ message: 'Match deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
