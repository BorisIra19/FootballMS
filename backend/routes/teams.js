const router = require('express').Router();
const Team = require('../models/Team');

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('leagueId', 'name country').sort({ points: -1 });
    res.json(teams);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('leagueId', 'name country');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    const populated = await team.populate('leagueId', 'name country');
    res.status(201).json(populated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('leagueId', 'name country');
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json({ message: 'Team deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
