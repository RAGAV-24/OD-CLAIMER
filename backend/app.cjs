const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(bodyParser.json());
const uri = 'mongodb+srv://ragavr33:rudu007@student.mrg3e.mongodb.net/ODClaimerDB?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
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
const teacherPasswordSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
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
const eventCoordinatorPasswordSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true }, 
});
const EventCoordinatorPassword = mongoose.model('eventcoordinatorpasswords', eventCoordinatorPasswordSchema);
const eventCoordinatorSchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  rollNo: { type: String, required: true },
  club: { type: String, required: true },
  position: { type: String, required: true },
  college: { type: String, required: true },
});
const EventCoordinator = mongoose.model('eventcoordinatorsdatas', eventCoordinatorSchema);
app.post('/signin', async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    const normalizedEmail = email.toLowerCase();
    if (userType === 'student') {
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password1' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password2' });
      }
      const student = await Student.findOne({ email: normalizedEmail });
      return res.status(200).json({ message: 'Login successful', data: { userType, student } });
    } else if (userType === 'teacher') {
      const teacherUser = await TeacherPassword.findOne({ email: normalizedEmail });
      if (!teacherUser) {
        return res.status(401).json({ message: 'Invalid email or password3' });
      }
      if (password !== teacherUser.password) {
        return res.status(401).json({ message: 'Invalid email or password4' });
      }
      const teacherData = await TeacherData.findOne({ email: normalizedEmail });
      return res.status(200).json({ message: 'Login successful', data: { userType, teacherData } });
    } 
    else if (userType === 'eventCoordinator') {
      const eventCoordinatorUser = await EventCoordinatorPassword.findOne({ email: normalizedEmail });
      if (!eventCoordinatorUser) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      if (password !== eventCoordinatorUser.password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const eventCoordinatorData = await EventCoordinator.findOne({ email: normalizedEmail });
      return res.status(200).json({ message: 'Login successful', data: { userType, eventCoordinatorData } });
    }
  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});
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
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ message: 'Students fetched successfully', students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});
app.get('/api/teacher', async (req, res) => {
  try {
    const teachers = await TeacherData.find(); 
    res.status(200).json({ message: 'Teachers fetched successfully', teachers });
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});
app.get('/api/eventcoordinator', async (req, res) => {
  try {
    const eventcoordinator = await EventCoordinator.find();
    console.log(eventcoordinator);
    res.status(200).json({ message: 'Event Coordinator fetched successfully', eventcoordinator });
  } catch (err) {
    console.error("Error fetching EventCoordinator:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
