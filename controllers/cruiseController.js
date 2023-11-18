const db = require("../config/mongo.init");
const Cruise = require("../models/cruise");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');


// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_KEY,
});

// Define multer storage using S3
var storage = multerS3({
    s3: s3,
    bucket:"swift-guard",
    acl: 'public-read', // Set the appropriate ACL for your use case
    key: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      cb(null, 'cruise/' + uuidv4() + ext); // Change 'cruise/' to your desired S3 folder path
    },
  });


//image location
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "storage/cruise");
//     },
//     filename: function (req, file, cb) {
//       let ext = path.extname(file.originalname);
//       cb(null, Date.now() + ext);
//     },
//   });

var upload = multer({
    storage: storage,
}).single("image");


exports.newCruise = async (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({
            status: 'FAILED',
            message: 'An error occurred while uploading the image.',
          });
        } else if (err) {
          return res.status(500).json({
            status: 'FAILED',
            message: 'An error occurred while uploading the image.',
          });
        }

        let { departureDestination, arrivalDestination, departureDate, arrivalDate, deck, cabinClass, price, duration, provider, mealPreferences, image, title, description, starRating } = req.body;

        if (!departureDestination || !arrivalDestination || !departureDate || !deck || !title || !description || !price || !duration || !provider) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newCruise = new Cruise({
            departureDestination,
            arrivalDestination,
            departureDate,
            arrivalDate,
            deck,
            cabinClass,
            image: req.file.location,
            title,
            description,
            mealPreferences,
            price,
            duration,
            provider,
            starRating
        });
        newCruise.save().then(result => {
            res.status(200).json({
                status: "SUCCESS",
                message: "New cruise  added successfully",
                data: result,
            })
        }).catch(err => {
            res.status(500).json({
                status: "FAILED",
                message: "An error occured while saving cruise !"
            })
        })
    })
};

exports.filter = async (req, res) =>{
    try{
        const cruises = await Cruise.find(req.query)

        res.status(200).json({
            status: "SUCCESS",
            length: cruises.length,
            data:{
                cruises
            }
        })
    }catch(err) {
        res.status(500).json({
            status: "FAILED",
            message: err.message
        })
    }
};



  
