// config/db.js
const mongoose = require('mongoose'); // Import Mongoose

// Create an async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Use 'await' to ensure MongoDB connection is established before proceeding
    await mongoose.connect('mongodb+srv://3hustlers:Oct8!88low@cloudchainkitchen.l5dvf.mongodb.net/cloudChainKitchen?retryWrites=true&w=majority', {
      useNewUrlParser: true, // Use the new MongoDB URL parser
      useUnifiedTopology: true, // Use the MongoDB unified topology engine
    });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    // Log error if the connection fails
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit the server if the connection to the database fails
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
