let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Student Model
let salarySchema = require('../models/Salary');



// READ Students
router.route('/:user').get((req, res) => {
  salarySchema .find({eid:req.params.user},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ Students
router.route('/').get((req, res) => {
  salarySchema .find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// CREATE Tasks
router.route('/create-salary').post((req, res, next) => {
  salarySchema.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
})
});



router.route('/get-salary/:id').get((req, res) => {
  salarySchema.find({eid:req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Task
router.route('/update-salary/:id').put((req, res, next) => {
  salarySchema.findOneAndUpdate({eid: req.params.id }, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
      return next(error);
      
    } else {
      res.json(data)
      console.log('Task updated successfully !')
    }
  })
})

// Delete Task
router.route('/delete-salary/:id').delete((req, res, next) => {
  salarySchema.deleteOne({eid: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;