const fs = require('fs');
const mongoose = require('mongoose');
const csv = require('csv-parser');

// MongoDB connection string
const uri = 'mongodb+srv://ragavr33:rudu007@student.mrg3e.mongodb.net/ODClaimerDB?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully.");
    uploadCSV();
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
  const eventCoordinatorSchema = new mongoose.Schema({
    timestamp: { type: String, required: true }, // Store timestamp as a string
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    rollNo: { type: String, required: true },
    club: { type: String, required: true },
    position: { type: String, required: true },
    college: { type: String, required: true },
  });
  
  const EventCoordinator = mongoose.model('EventCoordinatorsData', eventCoordinatorSchema);
  

// Function to upload CSV data to the Teacher collection
const uploadCSV = () => {
  const results = [];

  fs.createReadStream('../CSVFILES/EVENTCOORDINATORDATA.csv') // Ensure the correct file path
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      try {
        for (const eventData of results) {
          const eventcordi = new EventCoordinator({
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
          
          await eventcordi.save(); // Save each teacher to the database
        }
        console.log("CSV data uploaded successfully.");
      } catch (err) {
        console.error("Error uploading CSV data:", err);
      } finally {
        mongoose.connection.close(); // Close the database connection
      }
    });
};
