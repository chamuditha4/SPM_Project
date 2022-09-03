let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Asset Model
let AssetSchema = require('../models/Asset');
let AssetTypeSchema = require('../models/AssetType');

// READ Asset
router.route('/').get((req, res) => {
  AssetSchema .find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ Asset Type
router.route('/gettypes').get((req, res) => {
  AssetTypeSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// CREATE Asset
router.route('/create-asset').post((req, res, next) => {
  AssetSchema.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    console.log(data)
    res.json(data)
  }
})
});

// CREATE Asset Type
router.route('/create-asset-type').post((req, res, next) => {
  AssetTypeSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// Update Asset
router.route('/update-asset/:id').put((req, res, next) => {
  AssetSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
      return next(error);

    } else {
      res.json(data)
      console.log('Asset updated successfully !')
    }
  })
})

// Delete Asset
router.route('/delete-asset/:id').delete((req, res, next) => {
  AssetSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})


router.route('/get-asset/:id').get((req, res) => {
  AssetSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router;