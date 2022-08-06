const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChatSchema = new Schema({
  eid: {
    type: String
  },
  image: {
    type: String
  },
  text: {
    type: String
  }
}, {
    collection: 'Chat'
  })

module.exports = mongoose.model('Chat', ChatSchema)