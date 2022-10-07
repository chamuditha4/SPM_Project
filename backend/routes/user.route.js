const jwt = require('jsonwebtoken');
const util = require('./util');
require('dotenv').config();
const CryptoJS = require("crypto-js");
const key = "ASECRET";

const userData = {
  email: "123456",
  username: "tooti"
};
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// user Model
let userSchema = require('../Models/User');

// CREATE user
router.route('/create-user').post((req, res, next) => {
    userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});


router.route('/login-user').post((req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  const user = userSchema .findOne({username: username },(error, data) => {
    console.log(user)
    if (data){
      if ((CryptoJS.AES.decrypt((data.password),key)).toString(CryptoJS.enc.Utf8) === password){
        const token = util.generateToken(data);
        const userObj = util.getCleanUser(data);
        return res.json({ user: userObj, token });
      }else{
        return res.json({ user: 'pw Error' });
      }
      
    }else if(error){
      return res.json({ user: 'Error' });
    }else{
      return res.json({ user: 'User Error' });
    }
  })
})

// READ Students
router.route('/').get((req, res) => {
    userSchema .find((error, data) => {
      if (error) {
        return next(error)
      } else {
        let filtered_data = data.map(({_id, name, username, email, salary,department, roll}) => ({_id, name, username, email, salary,department, roll}));
        res.json(filtered_data)
      }
    })
  })

  router.route('/get-user/:id').get((req, res) => {
    userSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

// READ Students
router.route('/employees').get((req, res) => {
  userSchema .find({roll:"Employee"},(error, data) => {
    if (error) {
      return next(error)
    } else {
      let emp_data = data.map(({username,name, _id}) => ({username,name, _id}));
      res.json(emp_data)
    }
  })
})


// Get Single Student
router.route('/verifyToken').get((req, res) => {
    let token = req.body.token || req.query.token;
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }
    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) return res.status(401).json({
        error: true,
        message: "Invalid token."
      });

      // get basic user details
      let userObj = util.getCleanUser(user);
      return res.json({ user: userObj, token });
    });
})

// Update User
router.route('/update-user/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(req.params.id, {
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

// Delete User
router.route('/delete-user/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
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