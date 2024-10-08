const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');

const multer = require('multer');
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(bodyParser.json());
 
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Use original file extension
  }
});
const upload = multer({ storage });

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

// New Event Schema
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

const Event = mongoose.model('events', eventSchema);
const formSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Student name
  rollNo: { type: String, required: true },        // Roll number (allow duplicates)
  date: { type: Date, required: true },            // Date of event
  periods: { type: Number, required: true },       // Number of periods
  eventName: { type: String, required: true },     // Event name
  collegeName: { type: String, required: true },   // Name of the college
  geotagPhoto: { type: String, required: true },   // Geotag photo URL or path
  attendancePhoto: { type: String, required: true },// Attendance sheet photo URL or path
  submittedAt: { type: Date, default: Date.now }   // Submission timestamp
});
const Form = mongoose.model('StudentForm', formSchema); // Ensure you keep this line
// Sign-in endpoint
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

// Sign-up endpoint
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

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ message: 'Students fetched successfully', students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Get all teachers
app.get('/api/teacher', async (req, res) => {
  try {
    const teachers = await TeacherData.find(); 
    res.status(200).json({ message: 'Teachers fetched successfully', teachers });
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Get all event coordinators
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

// New Event Endpoints

// Create a new event
app.post('/api/events', async (req, res) => {
  const { name, date, time, location, description } = req.body;
  try {
    const newEvent = new Event({ name, date, time, location, description });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', newEvent });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});
app.post('/submit-od-form', upload.fields([{ name: 'geotagPhoto' }, { name: 'attendancePhoto' }]), async (req, res) => {
  const { name, rollNo, date, periods, eventName, collegeName } = req.body;
 
  try {
    // Access the uploaded files through req.files
    const geotagPhoto = req.files['geotagPhoto'][0].path; // Path to the geotag photo
    const attendancePhoto = req.files['attendancePhoto'][0].path; // Path to the attendance sheet photo

    const newForm = new Form({ // Use the Form model correctly
      name,
      rollNo, // Ensure this matches the field in your form
      date,
      periods,
      eventName,
      collegeName,
      geotagPhoto, // Use the file path
      attendancePhoto // Use the file path
    });

    await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    console.error("Error submitting form:", err);
    res.status(500).json({ message: 'Error submitting form', error: err });
  }
});


// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ message: 'Events fetched successfully', events });
  } catch (err) {
    console.error("Error fetching events:", err);
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
