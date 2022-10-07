const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AnnouncementSchema = new Schema({
  owner: {
    type: String
  },
  name: {
    type: String
  },
  department: {
    type: String
  },
  description: {
    type: String
  }
}, {
    collection: 'Announcement'
  })

module.exports = mongoose.model('Announcement', AnnouncementSchema)