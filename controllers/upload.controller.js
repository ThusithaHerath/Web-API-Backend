const multer = require('multer');
const path = require("path");
const db = require("../config/mongo.init");
const fs = require('fs');

exports.uploadDocument = (req, res) => {
    const upload = multer({
        storage: multer.diskStorage({
            destination: function (re, file, cb) {
                cb(null, './uploads');
            },
            filename: function (re, file, cb) {
                re.extension = path.extname(file.originalname)
                cb(null, req.documentId.toString() +  re.extension);
            }
        })
    });

    function manuallyInvokeUploadSingle(req, res, next) {
        upload.single('file')(req, res, next);
    }

    manuallyInvokeUploadSingle(req, res, (err) => {
        if (err) {

            return res.status(200).send({statue: false, message: 'File upload failed.'});
        }
        db.document.findOneAndUpdate({_id: req.documentId}, {
            $set: {
                documentTitle: req.body.document_title,
                expire: req.body.expire,
                email: req.body.email,
                extension:  req.extension
            }
        }, {new: true}).then(r => {
            if (r != null) {
                res.status(201).send({status: true, message: 'File uploaded manually.'});
            } else {
                return res.status(200).send({statue: false, message: 'File upload failed.'});
            }
        })


    });

}

exports.updateDocument = (req, res) => {
    const upload = multer({
        storage: multer.diskStorage({
            destination: function (re, file, cb) {
                cb(null, './uploads');
            },
            filename: function (re, file, cb) {
                re.extension = path.extname(file.originalname)
                cb(null, req.params.id +  re.extension);
            }
        })
    });

    function manuallyInvokeUploadSingle(req, res, next) {
        upload.single('file')(req, res, next);
    }

    manuallyInvokeUploadSingle(req, res, (err) => {
        if (err) {

            return res.status(200).send({statue: false, message: 'File upload failed.'});
        }
        db.document.findOneAndUpdate({_id: req.params.id}, {
            $set: {
                documentTitle: req.body.document_title,
                expire: req.body.expire,
                email: req.body.email,
                extension:  req.extension
            }
        }, {new: true}).then(r => {
            if (r != null) {
                res.status(201).send({status: true, message: 'File updated successfully.'});
            } else {
                return res.status(200).send({statue: false, message: 'File update failed.'});
            }
        })
    });

}

exports.deleteDocument = (req, res) => {

    db.document.findOneAndDelete({_id: req.params.id}, {new: true}).then(r => {
        if (r != null) {
            res.status(201).send({status: true, message: 'File deleted successfully.'});
        } else {
            return res.status(200).send({statue: false, message: 'File delete failed.'});
        }
    })

}



