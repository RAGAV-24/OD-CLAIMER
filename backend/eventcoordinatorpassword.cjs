const express = require('express');
const mongoose = require('mongoose');
const csv = require('csvtojson');
const multer = require('multer');
const cors = require('cors'); 
const path = require('path');
const fs = require('fs'); 


const uri = 'mongodb+srv://ragavr33:rudu007@student.mrg3e.mongodb.net/ODClaimerDB?retryWrites=true&w=majority';
const app = express();
const port = 4000;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'], 
  credentials: true 
}));

const uploadDir = 'uploadscsv/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });


const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, default: 'eventCoordinator' }
});

const User = mongoose.model('eventcoordinatorpasswords', UserSchema);

app.post('/upload-event-coordinator-passwords', upload.single('file'), async (req, res) => {
  try {
 
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const users = await csv().fromFile(req.file.path);

    const processedUsers = users.map(user => ({
      email: user.EventcoordinatorEmail,
      password: user.Eventcoordinatorrollno,
      userType: 'eventCoordinator'
    }));

  
    const bulkOps = processedUsers.map(user => ({
      updateOne: {
        filter: { email: user.email }, 
        update: { $setOnInsert: user }, 
        upsert: true 
      }
    }));

    const result = await User.bulkWrite(bulkOps);
    console.log('Users imported successfully:', result);
    res.status(200).json({ message: 'Users imported successfully', result });
  } catch (error) {
    console.error('Error importing users:', error);
    res.status(500).json({ error: 'Error importing users', details: error.message }); 
  } finally {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
