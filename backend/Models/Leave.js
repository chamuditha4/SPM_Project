const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LeaveSchema = new Schema({
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
    collection: 'leave'
  })

module.exports = mongoose.model('leave', LeaveSchema)