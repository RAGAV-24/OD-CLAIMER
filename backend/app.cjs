const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection string
const uri = 'mongodb+srv://ragavr33:rudu007@student.mrg3e.mongodb.net/ODClaimerDB?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Define the User model (for students)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true }, // e.g., 'student', 'teacher', 'event_coordinator'
});

const User = mongoose.model('User', userSchema);

// Define the Student model
const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  year: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: String, required: true },
  department: { type: String, required: true },
  classAdvisor: { type: String, required: true },
  mode: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

// Define the Teacher model (for authentication)
const teacherPasswordSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true }, // e.g., 'teacher'
});

const TeacherPassword = mongoose.model('teacherspasswords', teacherPasswordSchema);

const teacherDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  department: { type: String, required: true },
  dob: { type: String, required: true },
  college: { type: String, required: true },
});

const TeacherData = mongoose.model('teachersdatas', teacherDataSchema);

// Route to handle sign-in
app.post('/signin', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();

    // Check if the userType is 'student'
    if (userType === 'student') {
      const user = await User.findOne({ email: normalizedEmail });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password1' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password2' });
      }

      // Fetch student details
      const student = await Student.findOne({ email: normalizedEmail });
      return res.status(200).json({ message: 'Login successful', data: { userType, student } });

    // Check if the userType is 'teacher'
    } else if (userType === 'teacher') {
      const teacherUser = await TeacherPassword.findOne({ email: normalizedEmail });

      if (!teacherUser) {
        return res.status(401).json({ message: 'Invalid email or password3' });
      }

      // Compare plain password for teachers (no bcrypt)
      if (password !== teacherUser.password) {
        return res.status(401).json({ message: 'Invalid email or password4' });
      }

      // Fetch teacher details
      const teacherData = await TeacherData.findOne({ email: normalizedEmail });
      return res.status(200).json({ message: 'Login successful', data: { userType, teacherData } });

    // Handle other user types like event coordinator
    } else if (userType === 'event_coordinator') {
      // Logic for event coordinator login (if applicable)
    }

  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Route to handle sign-up (only for students)
app.post('/signup', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: normalizedEmail,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Sign-up error:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Route to get all students (fix for 404 error)
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ message: 'Students fetched successfully', students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
