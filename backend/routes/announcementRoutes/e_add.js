const router = require("express").Router();
let Supplier = require("../models/Supplier.model");

router.route("/").get((req, res) => {
    Supplier.find()
        .then((Supplier) => res.json(Supplier))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const SID = req.body.SID;
    const Fname = req.body.Fname;
    const LName = req.body.LName;
    const Address = req.body.Address;
    const NIC = req.body.NIC;
    const TP = req.body.TP;
    

    const newSupplier = new Supplier({
        SID,
        Fname,
        LName,
        Address,
        NIC,
        TP,
       
      
    });

    newSupplier
        .save()
        .then(() => res.json("Supplier Added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Supplier.findById(req.params.id)
        .then((Supplier) => res.json(Supplier))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Supplier.findById(req.params.id)
        .then((Supplier) => {
            Supplier.SID = req.body.SID;
            Supplier.Fname = req.body.Fname;
            Supplier.LName = req.body.LName;
            Supplier.Address = req.body.Address;
            Supplier.NIC = req.body.NIC;
            Supplier.TP = req.body.TP;
           

            Supplier.save()
                .then(() => res.json("Supplier updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Supplier.findByIdAndDelete(req.params.id)
        .then(() => res.json("Supplier deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;