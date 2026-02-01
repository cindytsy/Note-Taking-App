const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static('public'));

let users = [];
let notes = [];

// POST create note
app.post("/api/auth/register", (req, res) => {
  const { username, password } = req.body;

  // Server-side validation
  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required"
    });
  }

  // No duplicate registration
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({
      error: "User already exists"
    });
  }

  const newUser = {
    id: Date.now(),
    username,
    password 
  };

  users.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    userId: newUser.id
  });
});

// POST create note
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  // Server-side validation
  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required"
    });
  }

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      error: "Invalid username or password"
    });
  }

  res.json({
    message: "Login successful",
    userId: user.id
  });
});

// GET all notes
app.get("/api/notes", (req, res) => {
  const { userId } = req.query;
  const userNotes = notes.filter(n => n.userId == userId);
  res.json(userNotes);
});

// POST create note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;

  // Server-side validation
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
    userId: req.body.userId
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT update note
app.put("/api/notes/:id", (req, res) => {
  const note = notes.find(n => n.id == req.params.id);

  // Server-side validation
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  res.json(note);
});

// DELETE note
app.delete("/api/notes/:id", (req, res) => {
  notes = notes.filter(n => n.id != req.params.id);
  res.json({ message: "Note deleted" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
