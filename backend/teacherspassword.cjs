const mongoose = require('mongoose');
const csv = require('csvtojson');
const path = require('path');


const uri = 'mongodb+srv://ragavr33:rudu007@student.mrg3e.mongodb.net/ODClaimerDB?retryWrites=true&w=majority';

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
  userType: { type: String, default: 'student' } 
});

const User = mongoose.model('TeachersPassword', UserSchema);

const csvFilePath = path.join(__dirname, '../CSVFILES/TEACHERSDATA.csv');

const importUsers = async () => {
  try {
  
    const users = await csv().fromFile(csvFilePath);

  
    const processedUsers = users.map(user => {
      return {
        email: user.CAEMAIL,
        password: user.CADOB, 
        userType: 'teacher' 
      };
    });

  
    await User.insertMany(processedUsers);
    console.log('Users imported successfully');

    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error importing users:', error);
  }
};

importUsers();
