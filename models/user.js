const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

const bcrypt = require('bcryptjs');
const password = '123456';
const hashed = await bcrypt.hash(password, 10);
