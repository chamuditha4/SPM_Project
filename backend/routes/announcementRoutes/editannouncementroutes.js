const ResearchPayment = require('../models/researchPayment.model');

//Create Research Payment controller
const createResearchPayment = async (req, res) => {
    if(req.body) {
        const researchPayment = new ResearchPayment(req.body);
        await researchPayment.save()
            .then(data=>{
                res.status(200).send({data: data});
            })
            .catch(error =>{
                res.status(500).send({error: error.message});
            });
    }
}

//Get all Research Payment controller
const getAllResearchPayment = async (req, res) => {
    await ResearchPayment.find({})
        .populate('researchpayments', '_id name contactNo email depositedAmount depositedDate bank branch paymentSlip research')
        .then(data=>{
            res.status(200).send({data: data});
        })
        .catch(error =>{
            res.status(500).send({error: error.message});
        });
}

//Get a specific Research payment controller

const viewPaymentById = async (req, res) => {
    if (req.params && req.params.id) {
        await ResearchPayment.findById(req.params.id)
            .populate('researchpayments', '_id name contactNo email depositedAmount depositedDate bank branch paymentSlip research')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

//Get a specific WorkShop according to paymentID controller

const viewResearchByPaymentId = async (req, res) => {
    if (req.params && req.params.id) {
        await ResearchPayment.findById(req.params.id)
            .populate('research', '_id researcherName description researchURL')
            .then(response => {
                res.status(200).send({ data: response.research});
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

//Delete a Research Payment controller

const deleteById = async (req, res) => {
    const id = req.params.id
    await ResearchPayment.findByIdAndRemove(id).exec()
    res.send('item Deleted');
}

module.exports = {
    createResearchPayment,
    getAllResearchPayment,
    viewPaymentById,
    viewResearchByPaymentId,
    deleteById
};