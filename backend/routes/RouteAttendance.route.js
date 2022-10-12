

const qsrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const qarouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const qdrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const qfrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const qcrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const qrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;




const wsrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const warouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const wdrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const wfrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const wcrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const wrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const zsrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const zarouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const zdrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const zfrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const zcrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const zrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const xsrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const xarouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const xdrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const xfrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = xrouter;



const xcrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const xrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const csrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const carouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const cdrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const cfrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const ccrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const crouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const vsrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const varouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const vdrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const vfrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const vcrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const vrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const dsrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const darouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const drouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const dfrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const dcrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const grouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const srouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const arouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const gdrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const frouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const gcrouter = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;



const router = require('express').Router();
const  ObjectID = require('mongodb').ObjectId;
let staff_model = require('../models/staff');
let user_model = require('../models/user');
let group_panel_model = require('../models/group_panel');
const bcrypt = require('bcryptjs');
const timestamp = require('time-stamp');

router.route('/staff_registration').post((req,res) => {
    bcrypt.hash(req.body.password, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        const name  = req.body.name;
        const password = hashedPass;
        const email  = req.body.email;
        const tel  = req.body.tel;
        const fax  = req.body.fax;
        const eductions  = req.body.eductions;
        const userType  = req.body.userType;
        const Specialize  = req.body.Specialize;
        
        const username = email;
        const status = "Hold";
        const timeStamp = timestamp('YYYY/MM/DD HH:mm:ss');

        const saveInStaffCollection = new staff_model({ name, password, email, tel, fax, eductions, userType, status, timeStamp,Specialize});
        const saveInUserCollection = new user_model({ status, username, password, userType});
        
        saveInStaffCollection.save()
        .then(() => {       
            saveInUserCollection.save().then(() => {         
                res.status(200).send({status :"Staff Registration Success"});    
            }).catch((err) => {
                console.log(err);
                res.status(400).send({status: "Error with Updating Data",error: err.message});
            }); 
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        }); 
    }); 
});

router.route("/allStaff").get((req,res) => {
    staff_model.find().then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allTeamForPanel/:username").get((req,res) => {
    group_panel_model.find({$or: [{memberOne:  req.params.username },{memberTwo:  req.params.username },{memberThree:  req.params.username }]}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route("/alltSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});  

router.route('/getSupervisor').post((req, res, next) => {    

    staff_model.find({_id:new  ObjectID( req.body.id_num)})
    .then((staff) => {
        res.json(staff);
    })
    .catch(err => res.status(400). res.json({
        message:false,
    }))    
                    
});


router.route("/allCoSupervisorForSelectCategory/:specialize").get((req,res) => {
    staff_model.find({Specialize: req.params.specialize , userType : 'Co-Supervisor'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route('/panelCreate').post((req,res) => {
    
    const groupId  = req.body.groupId;
    const memberOne  = req.body.memberOne;
    const memberTwo  = req.body.memberTwo;
    const memberThree  = req.body.memberThree;
    const Specialize  = req.body.Specialize;
    const status = "Active";

    const savePanel = new group_panel_model({groupId, memberOne, memberTwo, memberThree, Specialize,status});
    
    savePanel.save()
    .then(() => {            
        res.status(200).send({status :"Panel Saving Success"});    
    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    }); 
});

router.route("/AllPanels").get((req,res) => {
    group_panel_model.find().then((group_panel) => {
        res.json(group_panel);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allPanelMembers").get((req,res) => {
    staff_model.find({userType:'Panel Member'}).then((staff) => {
        res.json(staff);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/oneAllStaff/:id").get((req,res) => {
    staff_model.find({_id : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
}); 

router.route('/updateStaffStatus').put((req, res)=>{
    const id = req.body.id;   
    const status = req.body.status;

    const staffStatusUpdate={status}
    staff_model.findOneAndUpdate({email:id},staffStatusUpdate).then(() => {        
        user_model.findOneAndUpdate({username:id},staffStatusUpdate).then(() => {        
            res.status(200).send({status :"Updating success"});
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });     
});

router.route("/deleteStaffStatus/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    staff_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});


router.route("/deletePanel/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    group_panel_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Staff Id Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
module.exports = router;