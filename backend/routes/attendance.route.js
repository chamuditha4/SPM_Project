let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Student Model
let AttendanceSchema = require('../models/Attendance');
let LeaveSchema = require('../models/Leave');


// READ Students
router.route('/').get((req, res) => {
  AttendanceSchema .find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ Students
router.route('/:eid').get((req, res) => {
  AttendanceSchema .find({eid:req.params.eid},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// CREATE Tasks
router.route('/create').post((req, res, next) => {
  AttendanceSchema.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
})
});

// READ Students
router.route('/leave/all').get((req, res) => {
  LeaveSchema .find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ Students
router.route('/leave/get/:eid').get((req, res) => {
  LeaveSchema .find({eid:req.params.eid},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// CREATE Tasks
router.route('/leave/create').post((req, res, next) => {
  LeaveSchema.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
})
});

// Delete User
router.route('/delete/:id').delete((req, res, next) => {
  AttendanceSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Delete User
router.route('/leave/delete/:id').delete((req, res, next) => {
  LeaveSchema.findByIdAndRemove(req.params.id, (error, data) => {
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