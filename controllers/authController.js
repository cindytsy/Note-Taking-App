const User = require('../models/user');
const bcrypt = require('bcryptjs');

function registerUser(req, res) {
  res.json({ message: 'Register user works' });
}

const loginUser = (req, res) => {
  res.json({ message: 'Login user works' });
};

const getNotes = (req, res) => {
  res.json({ message: 'Get notes works' });
};

const createNote = (req, res) => {
  res.json({ message: 'Create note works' });
};

const updateNote = (req, res) => {
  res.json({
    message: 'Update note works',
    noteId: req.params.id
  });
};

const deleteNote = (req, res) => {
  res.json({
    message: 'Delete note works',
    noteId: req.params.id
  });
};

module.exports = {
  registerUser,
  loginUser,
  getNotes,
  createNote,
  updateNote,
  deleteNote
};
