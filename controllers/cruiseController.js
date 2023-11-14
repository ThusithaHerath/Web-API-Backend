const db = require("../config/mongo.init");
const Cruise = require("../models/cruise");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//image location
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "storage/cruise");
    },
    filename: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });

var upload = multer({
    storage: storage,
}).single("image");

exports.newCruise = async (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({
            status: "FAILED",
            message: "An error occurred while uploading the image.",
          });
        } else if (err) {
          return res.status(500).json({
            status: "FAILED",
            message: "An error occurred while uploading the image.",
          });
        }

        let { departureDestination, arrivalDestination, departureDate, arrivalDate, deck, cabinClass, price, duration, provider, mealPreferences, image, title, description } = req.body;

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
            image: req.file.filename,
            title,
            description,
            mealPreferences,
            price,
            duration,
            provider
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



  
