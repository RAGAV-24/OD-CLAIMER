const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// MongoDB URI
const uri = 'mongodb+srv://ragavr33:rudu007@student.mrg3e.mongodb.net/ODClaimerDB?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  }
};

// Call the function to connect to the database when the server starts
connectDB();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, './uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Define the schema for the form
const FormSchema = new mongoose.Schema({
  rollNo: { type: String, required: true }, // Roll number
  name: { type: String, required: true }, // Student name
  date: { type: Date, required: true }, // Date of event
  periods: { type: Number, required: true }, // Number of periods
  eventName: { type: String, required: true }, // Event name
  collegeName: { type: String, required: true }, // Name of the college
  geotagPhoto: { type: String, required: true }, // Geotag photo URL or path
  attendancePhoto: { type: String, required: true }, // Attendance sheet photo URL or path
  submittedAt: { type: Date, default: Date.now } // Submission timestamp
});

// Create a Mongoose model for the form
const Form = mongoose.model('StudentForm', FormSchema);

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Specify the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid conflicts
  }
});

// Create multer instance
const upload = multer({ storage });

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads')); // Serve static files from the uploads directory

// Define the endpoint for form submission
app.post('/submit-od-form', upload.fields([{ name: 'geotagPhoto' }, { name: 'attendancePhoto' }]), async (req, res) => {
  const { name, rollNo, date, periods, eventName, collegeName } = req.body;

  // Check if files were uploaded
  if (!req.files || !req.files.geotagPhoto || !req.files.attendancePhoto) {
    return res.status(400).json({ error: 'Geotag photo and attendance photo are required' });
  }

  const geotagPhotoPath = req.files.geotagPhoto[0].path; // Path to the uploaded geotag photo
  const attendancePhotoPath = req.files.attendancePhoto[0].path; // Path to the uploaded attendance photo

  const formData = {
    name,
    rollNo,
    date: new Date(date), // Convert date string to Date object
    periods,
    eventName,
    collegeName,
    geotagPhoto: geotagPhotoPath, // Store the path in the database
    attendancePhoto: attendancePhotoPath, // Store the path in the database
  };

  try {
    const newForm = new Form(formData);
    await newForm.save();
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error uploading form data:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
