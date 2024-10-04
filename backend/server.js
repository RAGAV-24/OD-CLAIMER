const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema for 'Signin' collection with role (student or teacher)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },  // 'teacher' or 'student'
}, { collection: 'Signin' });

const User = mongoose.model('User', userSchema);

// OD schema for 'OD' collection
const odSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  requestDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' } // e.g., pending, approved, rejected
}, { collection: 'OD' });

const OD = mongoose.model('OD', odSchema);

// Teacher Sign-Up route to register teacher accounts
app.post('/api/signup/teacher', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      role: 'teacher',  // Teacher role
    });

    await user.save();
    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Student Sign-Up route (Teacher adds student accounts)
app.post('/api/signup/student', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      role: 'student',  // Student role
    });

    await user.save();
    res.status(201).json({ message: 'Student account created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign In route (for both teachers and students)
app.post('/api/signin', async (req, res) => {
  const { email, password, userType } = req.body; // Expect 'userType' to distinguish between teacher and student

  try {
    // Adjust this line to verify based on role
    const user = await User.findOne({ email, role: userType });  // Ensure correct role

    // If userType is student, check if the user exists
    if (userType === 'student' && !user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return successful response with user type
    res.status(200).json({ 
      message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} sign-in successful`,
      userType  // Returning userType for front-end usage
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// OD request route (for students)
app.post('/api/od-request', async (req, res) => {
  const { studentName, email } = req.body;

  try {
    const existingRequest = await OD.findOne({ email });
    if (existingRequest) {
      return res.status(400).json({ message: 'OD request already exists for this student' });
    }

    const newODRequest = new OD({
      studentName,
      email
    });

    await newODRequest.save();
    res.status(201).json({ message: 'OD request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all OD requests (for teachers)
app.get('/api/od-requests', async (req, res) => {
  try {
    const odRequests = await OD.find();
    res.status(200).json(odRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
