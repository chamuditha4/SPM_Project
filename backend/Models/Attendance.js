const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AttendanceSchema = new Schema({
  eid: {
    type: String
  },
  hrs: {
    type: String
  },
  min: {
    type: String
  },
  year: {
    type: String
  },
  mo: {
    type: String
  },
  date: {
    type: String
  },
  name: {
    type: String
  }
}, {
    collection: 'attendance'
  })

module.exports = mongoose.model('attendance', AttendanceSchema)