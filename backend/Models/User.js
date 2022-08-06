const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  salary: {
    type: String
  },
  department: {
    type: String
  },
  roll: {
    type: String
  }
}, {
    collection: 'users'
  })

module.exports = mongoose.model('users', userSchema)