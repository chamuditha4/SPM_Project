const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SubmissionSchema = new Schema({
  job_id: {
    type: String
  },
  eid: {
    type: String
  },
  time_start: {
    type: String
  },
  time_end: {
    type: String
  },
  log: {
    type: String
  },final: {
    type: Boolean
  }
}, {
    collection: 'submission'
  })

module.exports = mongoose.model('submission', SubmissionSchema)