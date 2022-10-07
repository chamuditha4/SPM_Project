let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Student Model
let SubmissionSchema = require('../models/Submission');


// READ Students
router.route('/').get((req, res) => {
  SubmissionSchema .find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ Students
router.route('/:jobid').get((req, res) => {
  SubmissionSchema .find({job_id:req.params.jobid},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// CREATE Tasks
router.route('/create-submission').post((req, res, next) => {
  SubmissionSchema.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
})
});



router.route('/get-submission/:id').get((req, res) => {
  SubmissionSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router;