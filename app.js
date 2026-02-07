const connectDB = require('./config/db');

console.log('Connect to MongoDB...');

 await connectDB();
