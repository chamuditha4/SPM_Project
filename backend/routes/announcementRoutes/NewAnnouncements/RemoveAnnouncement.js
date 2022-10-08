const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
let userDetails = require('../../models/User.model')

//
// router.route('/add').post(function (req,res) {
//     let userDetail = new UserDetail(req.body);
//     userDetail.save()
//         .then(sup=>{
//             res.status(200).json({'userDetail':'successful'});
//         }).catch(err=>{
//         res.status(400).send('fail');
//     });
// });


router.route('/add').post(function (req,res) {
    let userDetail = new userDetails(req.body);
    console.log("------------------------------------");
    console.log(req.body);
    console.log("------------------------------------");
    userDetails.findOne({ email: req.body.email  },)
        .exec()
        .then(userValid =>{
            if( userValid ){
                res.status(200).json({'userDetail': "userAvailable"});
            }else{
                console.log("**************success");
                res.status(200).json({'userDetail':'successful'});
            }
        }).catch(err=>{
        res.status(500).json(err);
    })


});

router.route('/getAllusers').get(function (req,res) {
    console.log("getDetails --- usermanage")
    userDetails.find().exec().then(item => {
        console.log(item)
        res.status(200).json(item)
    }).catch(err => {
            res.status(500).json(err);
        });
 });


router.route('/getDetailuser/:id').get(function (req,res) {
    console.log("getDetailsof the user----------------------------------------------");
    let id = req.params.id;

    userDetails.find({ _id : id }).exec().then(item => {
        console.log(item.email)
        res.status(200).json(item)
    }).catch(err => {
        res.status(500).json(err);
    });
});


router.get("/validateUser/:email/:password",function (req,res) {
    let email = req.params.email;
    let password = req.params.password;
    userDetails.findOne({ email: email, password: password },)
        .exec()
        .then(userValid =>{
            console.log("User Valid");
            console.log(userValid);
            console.log("User Valid");
            if( userValid ){
                res.status(200).json({"Message": userValid});
            }else{
                res.status(200).json({"Message": "unsuccessful"});
            }
        }).catch(err=>{
            res.status(500).json(err);
        })
});

router.route('/deleteUser/:id').get(function (req, res) {
    let id=req.params.id;
    console.log("Delete Called!");
    userDetails.deleteOne({_id:id}).then(sup=>{
         console.log("successful");
        res.status(200).json({'userDelete':'successful'});
    }).catch(err=>{
        console.log("fail");
        res.status(400).send('fail');
    });
});


router.route('/seachUser/:cust_name').get(function (req,res) {
    console.log("search entered");
    let name = req.params.cust_name;
    userDetails.find({firstName : name}).exec().then(item => {
        if( item ){
            res.status(200).json(item);
        }else{
            res.status(404).json({"message": "not found"});
        }
    })
        .catch(err=>{
            res.status(500).json(err);
        })
});

router.route('/updateDetail/:id/:fname/:lname/:email/:phone/:dob/:gender/:password').get(function (req, res) {
    console.log("update function called")
    let id = req.params.id;
    let fname=req.params.fname;
    let lname=req.params.lname;
    let email=req.params.email;
    let phone=req.params.phone;
    let dob=req.params.dob;
    let gender=req.params.gender;
    let password=req.params.password;


    userDetails.updateOne({_id : id},{$set: {firstName :fname, lastName: lname, phoneNumber: phone, gender: gender, email: email, password: password, dob: dob}}).then(sup=>{
        console.log(" successfully updated user");
        console.log(sup);
        res.status(200).json({'userUpdate':'successful'});
    }).catch(err=>{
        console.log("update fail");
        res.status(400).send('fail');
    });
});



module.exports = router;
