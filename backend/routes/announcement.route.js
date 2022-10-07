let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Student Model
let AnnouncementSchema = require('../models/Announcement');





// READ Announcement
router.route('/').get((req, res) => {
  AnnouncementSchema .find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// CREATE Announcement
router.route('/create-announcement').post((req, res, next) => {
  AnnouncementSchema.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
})
});

// READ Announcement
router.route('/:user').get((req, res) => {
  AnnouncementSchema .find({owner:req.params.user},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ Announcement
router.route('/read/:dept').get((req, res) => {
  AnnouncementSchema .find({department:req.params.dept},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.route('/get-announcement/:id').get((req, res) => {
  AnnouncementSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Announcement
router.route('/update-announcement/:id').put((req, res, next) => {
  AnnouncementSchema.findByIdAndUpdate(req.params.id, {
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

// Delete announcement
router.route('/delete-announcement/:id').delete((req, res, next) => {
  AnnouncementSchema.findByIdAndRemove(req.params.id, (error, data) => {
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