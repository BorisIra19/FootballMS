const router = require('express').Router();
const Player = require('../models/Player');

router.get('/', async (req, res) => {
  try {
    const players = await Player.find().populate('teamId', 'name city').sort({ goals: -1 });
    res.json(players);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/team/:teamId', async (req, res) => {
  try {
    const players = await Player.find({ teamId: req.params.teamId }).populate('teamId', 'name');
    res.json(players);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('teamId', 'name city');
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    const populated = await player.populate('teamId', 'name city');
    res.status(201).json(populated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('teamId', 'name city');
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json({ message: 'Player deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
