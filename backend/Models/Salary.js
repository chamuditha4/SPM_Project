const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let salarySchema = new Schema({
  eid: {
    type: String
  },
  salary: {
    type: String
  },
  bonus: {
    type: String
  }
}, {
    collection: 'salary'
  })

module.exports = mongoose.model('salary', salarySchema)