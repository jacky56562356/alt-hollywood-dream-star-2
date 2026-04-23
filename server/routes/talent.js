
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Talent Schema
const ActorSchema = new mongoose.Schema({
  name: String,
  ageRange: String,
  skills: [String],
  credits: [String],
  imageUrl: String
});
const Actor = mongoose.model('Actor', ActorSchema);

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// @route   GET api/talent
router.get('/', async (req, res) => {
  try {
    const actors = await Actor.find();
    res.json(actors);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/talent
router.post('/', auth, async (req, res) => {
  try {
    const newActor = new Actor(req.body);
    const actor = await newActor.save();
    res.json(actor);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/talent/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actor);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/talent/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Actor.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Actor removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
