const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AssetSchema = new Schema({
  name: {
    type: String
  },
  employee: {
    type: Array
  },
  description: {
    type: String
  },
  uid: {
    type: String
  },
  type: {
    type: String
  },
  status: {
    type: String
  },
  value: {
    type: Number
  }
}, {
    collection: 'asset'
  })

module.exports = mongoose.model('asset', AssetSchema)