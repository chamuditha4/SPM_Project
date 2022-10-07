const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AssetTypeSchema = new Schema({
  type: {
    type: String
  },
  description: {
    type: String
  }
}, {
    collection: 'assettypes'
  })

module.exports = mongoose.model('assettypes', AssetTypeSchema)