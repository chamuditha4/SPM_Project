let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Student Model
let ChatSchema = require('../models/Chat');





// READ Announcement
router.route('/').get((req, res) => {
  ChatSchema .find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// CREATE Announcement
router.route('/create-chat').post((req, res, next) => {
  ChatSchema.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
})
});



module.exports = router;