const fs = require('fs');
const mongoose = require('mongoose');
const csv = require('csv-parser');

const uri = 'mongodb+srv://ragavr33:rudu007@student.mrg3e.mongodb.net/ODClaimerDB?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully.");
    uploadCSV(); 
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });


const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  department: { type: String, required: true },
  dob: { type: String, required: true }, 
  college: { type: String, required: true },
});

const Teacher = mongoose.model('TeachersData', teacherSchema);

const uploadCSV = () => {
  const results = [];

  fs.createReadStream('../CSVFILES/TEACHERSDATA.csv') 
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      try {
        
        for (const teacherData of results) {
          const teacher = new Teacher({
            name: teacherData.CANAME,
            email: teacherData.CAEMAIL,
            class: teacherData.CACLASS,
            department: teacherData.CADEPARTMENT,
            dob: teacherData.CADOB,
            college: teacherData.CACOLLEGE,
          });
          
          await teacher.save(); 
        }
        console.log("CSV data uploaded successfully.");
      } catch (err) {
        console.error("Error uploading CSV data:", err);
      } finally {
        mongoose.connection.close(); 
      }
    });
};
