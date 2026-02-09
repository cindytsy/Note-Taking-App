const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://cindytsy0630_db_user:Tt89211677@notetakingapp.sqqc2k0.mongodb.net/notetakingapp';

const connectDB = async () => {
  try {
    console.log('Trying to connect to MongoDB...');
    await mongoose.connect(MONGO_URI); 
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;