const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');

const User = require('../models/User');

// Get all users (admin only)
router.get('/users', authorize(['admin']), async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
