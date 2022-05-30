const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdb');
const userSchema = mongoose.Schema({
  cname:String,
  cnumber: Number
}) 
module.exports = mongoose.model('users', userSchema);