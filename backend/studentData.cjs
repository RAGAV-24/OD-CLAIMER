const fs = require('fs');
const mongoose = require('mongoose');
const csv = require('csv-parser');

// MongoDB connection string
const uri = 'mongodb+srv://ragavr33:rudu007@student.mrg3e.mongodb.net/ODClaimerDB?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully.");
    uploadCSV(); // Call the function to upload CSV data
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Define the schemas for Student and StudentPersonalInfo
const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  year: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  department: { type: String, required: true },
  classAdvisor: { type: String, required: true },
  mode: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

// Function to upload CSV data to the Student collection
const uploadCSV = () => {
  const results = [];

  fs.createReadStream('../CSVFILES/STUDENT_DETAILS.csv')
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      try {
        // Insert each row into the Student collection
        for (const studentData of results) {
          const student = new Student({
            rollNumber: studentData.ROLL_NUMBER,
            name: studentData.NAME,
            class: studentData.CLASS,
            year: studentData.YEAR,
            email: studentData.EMAIL,
            dob: new Date(studentData.DOB), // Ensure to convert DOB to a Date object
            department: studentData.DEPARTMENT,
            classAdvisor: studentData.CLASS_ADVISOR,
            mode: studentData.MODE,
          });
          
          await student.save(); // Save each student to the database
        }
        console.log("CSV data uploaded successfully.");
      } catch (err) {
        console.error("Error uploading CSV data:", err);
      } finally {
        mongoose.connection.close(); // Close the database connection
      }
    });
};
