const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RateSchema = new Schema({
  jobid: {
    type: String
  },
  rate: {
    type: String
  },
  feedback: {
    type: String
  }
}, {
    collection: 'rate'
  })

module.exports = mongoose.model('rate', RateSchema)