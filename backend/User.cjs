const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Use roll number as password
  userType: { type: String, required: true }, // e.g., 'student', 'teacher', 'event_coordinator'
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
