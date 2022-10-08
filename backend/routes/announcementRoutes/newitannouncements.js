const User = require('../models/users');
const Session = require('../models/sessions');
const Research = require('../models/research');
const sendToken = require('../utils/jwtToken');
const { addNotification, removeNotification, getNotification } = require('../utils/notificationManager');
const sendMail = require('../utils/emailService');

//Genaral
//Show All Approved Research Papers
exports.getAllApprovedSessions = async (req, res, next) => {

    const sessions = await Session.find({ "approvel.isApproved": 2 });

    if (sessions.length == 0) {
        return res.status(404).json({
            success: false,
            message: 'No Approveed Sessions'
        });
    }

    data = {
        email: "janitha613@gmail.com"
    }

    res.status(200).json({
        success: true,
        message: 'Sessions fetched',
        sessions
    })
}

//Show All Sessions Approved By Admin
exports.getAllApprovedResearchPapers = async (req, res, next) => {

    const research = await Research.find({ "isApproved": true });

    if (research.length == 0) {
        return res.status(404).json({
            success: false,
            message: 'No Approveed Researches'
        });
    }

    res.status(200).json({
        success: true,
        message: 'All Reseachs',
        research
    })

}

//Registered User +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//User Registration
exports.registerUser = async (req, res, next) => {

    const { firstName, lastName, fullName, birthday, email, password, public_id, url, role,
        profileCreatedAt, contactNumber, gender, street1, street2, city, zipCode, country, highestEducation, certifiedDate,
        institued,
    } = req.body;

    const user = await User.create({
        name: {
            firstName,
            lastName
        },
        fullName,
        birthday,
        email,
        password,
        profilePicture: {
            public_id,
            url
        },
        role,
        profileCreatedAt,
        contactNumber,
        gender,
        address: {
            street1,
            street2,
            city,
            zipCode,
            country
        },
        education: {
            highestEducation,
            certifiedDate,
            institued
        }
    })

    sendToken(user, 200, res);

}

//Get Current User
exports.getUserProfile = async (req, res, next) => {

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(401).json({
            success: false,
            user: [],
            message: 'User Not Found'
        })
    }

    res.status(200).json({
        success: true,
        user
    })
}

//User Login
exports.loginUser = async (req, res, next) => {

    const { email, password } = req.body;

    //Check Entered Email And Password Are Empty
    if (!email || !password) {
        return res.status(204).json({
            success: false,
            message: 'Email Or Password Empty'
        })
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User No Found'
        })
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Email Or Password'
        })
    }

    sendToken(user, 200, res);

}

//Logout User
exports.logoutUser = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })

}

//Update User
exports.updateUser = async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User Not Found'
        })
    }

    user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })
}

//Mark As Read Notification
exports.notificationMarker = async (req, res, next) => {

    await removeNotification(req.params.id, req.user.id)

    res.status(200).json({
        success: true,
        message: 'Notification Removed'
    })
}

//Admin +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Admin Get All Users
exports.getAllUsers = async (req, res, next) => {

    const users = await User.find();

    if (!users) {
        return res.status(404).json({
            success: false,
            message: 'No Any Users'
        });
    }

    res.status(200).json({
        success: true,
        count: users.length,
        users,
        message: 'All Users Fetch SuccessFully'
    })
}

//Get All Sessions
exports.getAllSessions = async (req, res, next) => {

    const users = await User.find();

    if (!users) {
        return res.status(404).json({
            success: false,
            message: 'No Any Users'
        });
    }

    res.status(200).json({
        success: true,
        count: users.length,
        users,
        message: 'All Users Fetch SuccessFully'
    })

}

//Get All Reasearch Papers
exports.getResearchPapers = async (req, res, next) => {

    const users = await User.find();

    if (!users) {
        return res.status(404).json({
            success: false,
            message: 'No Any Users'
        });
    }

    res.status(200).json({
        success: true,
        count: users.length,
        users,
        message: 'All Users Fetch SuccessFully'
    })

}

//Update User Type By Admin
exports.updateUserRole = async (req, res, next) => {

    let type = req.body.role
    let userID = req.body.userID

    let user = await User.findById(userID);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User Not Found'
        })
    }

    user = await User.findByIdAndUpdate(userID, { role: type }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })
}

//Approve Sessions By Admin
exports.approveSessions = async (req, res, next) => {

    let sessionID = req.params.id
    let session = await Session.findById(sessionID);

    if (!session) {
        return res.status(404).json({
            success: false,
            message: 'Session Not Found',
            session
        })
    }

    session = await Session.updateOne({ _id: sessionID }, { approvel: { isApproved: 2, approvedDate: Date.now(), approvedBy: req.user.id } }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    session = await Session.findById(sessionID);

    addNotification('Your Session Request Approve By Admin', req.user.id);

    res.status(200).json({
        success: true,
        session
    })
}

//Reject Sessions By Admin
exports.rejectSessions = async (req, res, next) => {

    let sessionID = req.params.id
    let session = await Session.findById(sessionID);

    if (!session) {
        return res.status(404).json({
            success: false,
            message: 'Session Not Found',
            session
        })
    }

    session = await Session.updateOne({ _id: sessionID }, { approvel: { isApproved: 1, approvedDate: Date.now(), approvedBy: req.user.id } }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    session = await Session.findById(sessionID);

    addNotification('Your Session Request Rejected By Admin', req.user.id);

    res.status(200).json({
        success: true,
        session
    })
}

//Reviwer +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Approve Sessions By Reviwer
exports.approveReseachPapers = async (req, res, next) => {

    let researchID = req.params.id
    let researchPublicaion = await Research.findById(researchID);

    if (!researchPublicaion) {
        return res.status(404).json({
            success: false,
            message: 'Session Not Found',
            researchPublicaion
        })
    }

    researchPublicaion = await Research.updateOne({ _id: researchID }, { isApproved: true, approvedDate: Date.now(), approvedBy: req.user.id }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    researchPublicaion = await Research.findById(researchID);

    addNotification(`Your Reasearch Publication Approve By Reviewer ${req.user.id}`, req.user.id);

    res.status(200).json({
        success: true,
        researchPublicaion
    })
}

exports.getNotification = async (req, res) => {

    const user = await User.findById(req.user.id);

    let notification = await getNotification(user._id);

    if (notification.length == 0) {
        res.status(200).json({
            success: true,
            notification: []
        })
    }

    let outNotifications = (notification[0].notifications);

    res.status(200).json({
        success: true,
        outNotifications
    })

}