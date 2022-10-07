const Research = require('../models/research.model');

//Create Research controller
const createResearch = async (req, res) => {
    if(req.body) {
        const research = new Research(req.body);
         await research.save()
            .then(data=>{
                res.status(200).send({data: data});
            })
            .catch(error =>{
                res.status(500).send({error: error.message});
            });
    }
};

//Get all Research controller
const viewAllResearch = async (req, res) => {
    await Research.find({})
        .then(data=>{
            res.status(200).send({data: data});
        })
        .catch(error =>{
            res.status(500).send({error: error.message});
        });
}

//Get a specific Research controller
const viewById = async (req, res) => {
    if (req.params && req.params.id) {
        await Research.findById(req.params.id)
            .populate('research', '_id researcherName researcherContactNo researcherEmail researchTitle description researchURL')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

//Delete a Research controller

const deleteById = async (req, res) => {
    const id = req.params.id
    await Research.findByIdAndRemove(id).exec()
    res.send('item Deleted');
}

//Update a Research controller

const updateById = async (req, res) => {
    const id = req.params.id;
    const {researcherName, researcherContactNo, researcherEmail, description, researchURL} = req.body;
    const updateResearch = {
        researcherName,
        researcherContactNo,
        researcherEmail,
        description,
        researchURL
    }
    const update = await Research.findByIdAndUpdate(id, updateResearch)
        .then(() => {
            res.status(200).send({status: "Research Updated"})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: " Error", error:err.message});
        })
}

module.exports = {
    createResearch,
    viewAllResearch,
    viewById,
    deleteById,
    updateById
};