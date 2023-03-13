const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

   name: {
    type: String,
    required: [true, 'User name is required']
   },
   password: {
    type: String,
    required: true
   },
   email: {
    type: String,
    lowercase: true,
    unique: [true, 'Email is already exists in database.'],
    required: true
   },
   role: {
    type: String,
    enum: ['user', 'admin'],
    required: [true, 'Please Specify the role of user. ']
   },
   created: {
    type: Date,
    default: Date.now
   }
});

const User = mongoose.model('User', userSchema);

module.exports = User;