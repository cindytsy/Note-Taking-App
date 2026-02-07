const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://cindytsy0630_db_user:Tt89211677@notetakingapp.sqqc2k0.mongodb.net/notetakingapp';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connect Fail:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
