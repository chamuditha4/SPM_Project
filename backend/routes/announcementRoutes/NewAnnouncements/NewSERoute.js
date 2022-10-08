const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
let itemcolor = require('../../models/ItemColor.model');
let NewArraivalItem = require('../../models/NewArrivalItem.model');

router.route('/getAllItemColors').get(function (req, res) {
    itemcolor.find().populate("itemCode").exec().then(item => {
        res.status(200).json(item)
    })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.route('/getAllNewArraivalItems').get(function (req, res) {
    NewArraivalItem.find().populate("itemCode").exec().then(item => {

        res.status(200).json(item)
    })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete("/deleteNewArraivalItems/:id",function (req,res) {

    const id = req.params.id;

    NewArraivalItem.findByIdAndRemove({_id: id})
        .exec()
        .then(result=>{
            res.status(200).json({'delete':'success'});

        })
        .catch(err=>{
            res.status(500).json(err);
        })
});


router.route('/getnewitemdetailswithcolors').get(function (req, res) {
    itemcolor.find().populate("itemCode").exec().then(item => {
        res.status(200).json(item)
    })
        .catch(err => {
            res.status(500).json(err);
        });

})

router.route('/getAllNewItems').get(function (req, res) {
    NewArraivalItem.find().populate("itemCode").populate("brandCode").exec().then(item => {
        res.status(200).json(item)
    })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.route('/getItemColorDetail/:id').get(function (req, res) {
    let id = req.params.id;

    itemcolor.findOne({ _id: id }).populate("itemCode").exec().then(item => {

        res.status(200).json(item)
    })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.route('/getItemSizes/:itemColorId').get(function (req, res) {
    let id = '#'+req.params.itemColorId;

    itemcolor.find({ itemColor: id }).populate("itemCode").exec().then(item => {
        res.status(200).json(item)
    })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.route('/viewStocks/:id').get(function (req, res) {
    let id =req.params.id;
    console.log("aaaaa:"+ id);
    itemcolor.find({ _id: id }).populate("itemCode").exec().then(item => {
        //console.log(item)
        res.status(200).json(item)
    })
        .catch(err => {
            //  console.log("Fail")
            res.status(500).json(err);
        });

});


router.route('/getNewItemDetailsById').get(function (req, res) {

    itemcolor.find().populate("itemCode").exec().then(item => {
        res.status(200).json(item)
    })
        .catch(err => {
            res.status(500).json(err);
        });

    // itemcolor.find({ itemCode: { $elemMatch: { _id: id } } }).exec().then(item => {
    //     console.log(item)
    //     res.status(200).json(item)
    // })
    //     .catch(err => {
    //         res.status(500).json(err);
    //     });
    // itemcolor.find().populate("itemCode").exec().then(item => {
    //     let count =0;
    //     item.map(itemDetails => {
    //       //  console.log(itemDetails.itemCode[count]._id);
    //         console.log("LLLL")
    //         console.log(count);
    //         console.log(itemDetails.itemCode[count]._id);
    //         console.log("LLLLL")
    //         if(itemDetails.itemCode[count]._id=== id){
    //             res.status(200).json(itemDetails.itemCode[count]._id)
    //         }
    //         count= count+1;
    //
    //     })
    //
    // })
    //     .catch(err => {
    //         res.status(500).json(err);
    //     });
});


module.exports = router;