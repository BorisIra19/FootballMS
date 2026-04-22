const router = require('express').Router();
const League = require('../models/League');

router.get('/', async (req, res) => {
  try {
    const leagues = await League.find().sort({ createdAt: -1 });
    res.json(leagues);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const league = new League(req.body);
    await league.save();
    res.status(201).json(league);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const league = await League.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!league) return res.status(404).json({ error: 'League not found' });
    res.json(league);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const league = await League.findByIdAndDelete(req.params.id);
    if (!league) return res.status(404).json({ error: 'League not found' });
    res.json({ message: 'League deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
