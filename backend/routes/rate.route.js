let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Student Model
let RateSchema = require('../models/Rate');


// READ Students
router.route('/').get((req, res) => {
  RateSchema .find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ Students
router.route('/:jobid').get((req, res) => {
  RateSchema .find({jobid:req.params.jobid},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// CREATE Tasks
router.route('/create-rate').post((req, res, next) => {
  RateSchema.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
})
});



router.route('/get-rate/:id').get((req, res) => {
  RateSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router;