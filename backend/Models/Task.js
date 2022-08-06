const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
  owner: {
    type: String
  },
  name: {
    type: String
  },
  eids: {
    type: Array
  },
  description: {
    type: String
  }
}, {
    collection: 'tasks'
  })

module.exports = mongoose.model('tasks', TaskSchema)