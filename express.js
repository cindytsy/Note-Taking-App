require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const Note = require('./models/note');
const User = require('./models/user');

const app = express();

console.log('app.js started');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API running');
});

// ---------- Auth ----------

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: 'Username and password required' });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(409).json({ error: 'User already exists' });

    const user = await User.create({ username, password });
    res.status(201).json({ message: 'User registered', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if(!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ message: 'Login successful', userId: user._id });
});

// ---------- Notes CRUD ----------

// GET notes
app.get('/api/notes', async (req, res) => {
  const { userId } = req.query;
  const notes = await Note.find({ user: userId
 });
  res.json(notes);
});

// POST note
app.post('/api/notes', async (req, res) => {
  const { title, content, userId } = req.body;
  const note = await Note.create({ title, content, user: userId
});
  res.status(201).json(note);
});

// PUT note
app.put('/api/notes/:id', async (req, res) => {
  const updated = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE note
app.delete('/api/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

// Start server
const PORT = 5000;

const startServer = async () => {
  try {
    await connectDB(); 
    console.log('MongoDB Connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
  }
}

startServer();
