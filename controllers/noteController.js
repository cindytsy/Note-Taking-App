const Note = require('../models/note');

const getNotes = async (req, res) => {
  try {
 
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // user ID
    const note = await Note.create({
      title,
      content,
      user: req.user.id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Confirm
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Confirm
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await note.remove();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote
};
