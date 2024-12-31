const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 

const uri = 'mongodb+srv://ragavr33:rudu007@student.mrg3e.mongodb.net/ODClaimerDB?retryWrites=true&w=majority';
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'], 
  credentials: true 
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadscsv/'); 
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


app.post('/upload-event-coordinator-data', upload.single('file'), (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path) 
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      try {
        for (const eventData of results) {
          const eventCoordinator = new EventCoordinator({
            timestamp: eventData.Timestamp,
            name: eventData.EventcoordinatorName,
            email: eventData.EventcoordinatorEmail,
            address: eventData.EventcoordinatorAddress,
            phoneNumber: eventData.Eventcoordinatorphonenumber,
            rollNo: eventData.Eventcoordinatorrollno,
            club: eventData.Eventcoordinatorclub,
            position: eventData.EventcoordinatorPosition,
            college: eventData.EventcoordinatorCollege,
          });

          await eventCoordinator.save(); 
        }
        console.log("CSV data uploaded successfully.");
        res.status(200).json({ message: 'CSV data uploaded successfully.' });
      } catch (err) {
        console.error("Error uploading CSV data:", err);
        res.status(500).json({ error: 'Error uploading CSV data.' });
      } finally {
        
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
