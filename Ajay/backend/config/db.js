const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    global.useLocalDB = false;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ MongoDB is not running. Gracefully falling back to Local JSON File Storage!');
    global.useLocalDB = true;
  }
};

module.exports = connectDB;
