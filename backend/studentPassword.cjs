const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const csv = require('csvtojson');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the CORS package

// MongoDB connection string
const uri = 'mongodb+srv://ragavr33:rudu007@student.mrg3e.mongodb.net/ODClaimerDB?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

// Define User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, default: 'student' } // Assuming all are students
});

const User = mongoose.model('users', UserSchema);

// Initialize express app
const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend origin
  methods: ['GET', 'POST'], // Specify allowed methods
  credentials: true // Allow credentials if needed
}));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadscsv/'); // Specify the folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original file name
  },
});

const upload = multer({ storage: storage });

// Route to handle file uploads
app.post('/upload-student-credentials', upload.single('file'), async (req, res) => {
  try {
    // Convert CSV to JSON from the uploaded file
    const users = await csv().fromFile(req.file.path);

    // Process users: Set roll number as password and email as email
    const processedUsers = await Promise.all(users.map(async user => {
      const hashedPassword = await bcrypt.hash(user.ROLL_NUMBER, 10);
      return {
        email: user.EMAIL,
        password: hashedPassword,
        userType: 'student'
      };
    }));

    // Insert users into MongoDB
    await User.insertMany(processedUsers);
    
    // Optionally delete the uploaded file after processing
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.status(200).send('Users imported successfully');
  } catch (error) {
    console.error('Error importing users:', error);
    res.status(500).send('Error importing users');
  }
});

// Start the server
const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
