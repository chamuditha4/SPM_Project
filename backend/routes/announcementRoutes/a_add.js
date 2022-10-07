const router = require('express').Router();
let Sales = require('../models/Sales.model');

router.route('/').get((req, res) => {
    Sales.find()
        .then(Sales => res.json(Sales))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Add Function

router.route('/add').post((req, res) => {

    const IBillNO = req.body.IBillNO;
    const CID = req.body.CID;
    const ItemName = req.body.ItemName;
    const ItemID =req.body.ItemID;
    const Itemqty = req.body.Itemqty;
    const Cat = req.body.Cat;
    const Price = req.body.Price;
    const PMethod =req.body.PMethod;
    const Date =req.body.Date;



    const newSales = new Sales({

        IBillNO,
        CID,
        ItemName,
        ItemID,
        Itemqty,
        Cat,
        Price,
        PMethod,
        Date,

    });



    newSales.save()
        .then(() => res.json('Sales added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get Data 
router.route('/:id').get((req, res) => {
    Sales.findById(req.params.id)
        .then(Sales => res.json(Sales))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Data

router.route('/:id').delete((req, res) => {
    Sales.findByIdAndDelete(req.params.id)
        .then(() => res.json('Sales deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Update data
router.route('/update/:id').post((req, res) => {
    Sales.findById(req.params.id)
        .then(Sales => {
            Sales.IBillNO = req.body.IBillNO;
            Sales.CID = req.body.CID;
            Sales.ItemName =req.body.ItemName;
            Sales.ItemID = req.body.ItemID;
            Sales.Itemqty = req.body.Itemqty;
            Sales.Cat = req.body.Cat;
            Sales.Price =req.body.Price;
            Sales.PMethod =req.body.PMethod;
            Sales.Date =req.body.Date;


            Sales.save()
                .then(() => res.json('Sales updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;