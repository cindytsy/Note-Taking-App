const mongoose = require('mongoose');

const mongoURI =
  'mongodb+srv://cindytsy0630_db_user:Tt89211677@cluster1.pspzmrt.mongodb.net/?appName=Cluster1';

async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connect Success！');
  } catch (error) {
    console.error('MongoDB Connect Fail:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
