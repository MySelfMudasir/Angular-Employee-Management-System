const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Ensure usernames are unique.
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  password: { type: String, required: true }, // Consider hashing passwords in real-world applications
  is_deleted: { type: Number, default: 0 }
});


const employeeSchema = new mongoose.Schema({
  employeeid: { type: String, required: true },
  username: { type: String, required: true},
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: Number, required: true },
  role: { type: String, required: true },
  image: { type: String, required: false },
});




const User = mongoose.model('User', userSchema);
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = { User, Employee };