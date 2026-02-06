router.post('/register', registerUser);
router.post('/login', loginUser);

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // 你的 User model

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Check if email/password is offered
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // 3️⃣ Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // 4️⃣ Login success
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
