const express = require('express');
const router = express.Router();
const Note = require('../models/note');

const {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');


// Get all notes
router.get('/', getNotes);

// Create a new note
router.post('/', createNote);

// Update a note
router.put('/:id', updateNote);

// Delete a note
router.delete('/:id', deleteNote);

module.exports = router;
