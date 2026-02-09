const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Avoid OverwriteModelError
module.exports = mongoose.models.Note || mongoose.model('Note', noteSchema);
