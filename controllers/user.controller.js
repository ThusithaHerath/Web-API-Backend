const db = require("../config/mongo.init");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.checkLogin = (req, res) => {

    let refreshId = req.body.userId + process.env.JWT_SECRET;
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
    req.body.refreshKey = salt;
    let token = jwt.sign(req.body, process.env.JWT_SECRET);
    let b = Buffer.from(hash);


    db.user.find({email: req.body.email}).exec().then(r => {
        if (r.length !== 0) {
            res.status(200).send({status: true, token, user: r[0]})
        } else {
            res.status(200).send({status: false, message: "No such user"})
        }
    })
}

exports.saveNewUser = (req, res) => {

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;

    const user = new db.user({
        fullName: req.body.fullName, email: req.body.email, password: req.body.password
    });
    user.save().then(r => {
        if (r.length !== 0) {
            res.status(201).send({status: true, user});
        } else {
            res.status(200).send({status: false});
        }
    });
}

exports.getUsers = (req, res) => {
    db.user.find().exec().then((result) => {

        if (result[0]) {
            res.status(200).send({status: true, data: result});
        } else {
            res.status(200).send({status: false, data: 'No files found'});
        }

    });

}

exports.putUser = (req, res) => {
    db.user.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            fullName: req.body.fullName, email: req.body.email,
        }
    }, {new: true}).then(r => {
        if (r != null) {
            res.status(201).send({status: true, message: 'User updated.'});
        } else {
            return res.status(200).send({statue: false, message: 'User update failed.'});
        }
    })

}

exports.deleteUser = (req, res) => {
    db.user.findOneAndDelete({_id: req.params.id}, {new: true}).then(r => {
        if (r != null) {
            res.status(201).send({status: true, message: 'User deleted.'});
        } else {
            return res.status(200).send({statue: false, message: 'User delete failed.'});
        }
    })

}

exports.saveDocument = (req, res, next) => {
    if (!req.is('multipart/form-data')) {

        return res.status(400).send({status: false, data: "Request body should be multipart form data"});
    }
    const document = new db.document({
        documentTitle: req.body.document_title, expire: req.body.expire, email: req.body.email, userId: req.jwt.userId
    });
    document.save().then(r => {
        if (r.length !== 0) {
            req.documentId = r._id
            return next();
        } else {
            res.status(200).send({status: false});
        }
    });
}

exports.getDocuments = (req, res) => {

    db.document.find({userId: req.jwt.userId}).exec().then((result) => {

        if (result[0]) {
            res.status(200).send({status: true, data: result});
        } else {
            res.status(200).send({status: false, data: 'No files found'});
        }

    });
}
