const db = require("../config/mongo.init");
const Package = require("../models/package");

exports.newPackage = async (req, res) => {
    let { destination, duration, numberOfTravelers, speciality, packageRating, price, title, description } = req.body;

    if (!destination || !duration || !numberOfTravelers || !speciality || !packageRating || !price || !title || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPackage = new Package({
        destination,
        duration,
        numberOfTravelers,
        speciality,
        packageRating,
        price,
        title,
        description
    });
    newPackage.save().then(result => {
        res.status(200).json({
            status: "SUCCESS",
            message: "New package  added successfully",
            data: result,
        })
    }).catch(err => {
        res.status(500).json({
            status: "FAILED",
            message: "An error occured while saving package !"
        })
    })
};

exports.filter = async (req, res) =>{
    try{
        const packages = await Package.find(req.query)
        res.status(200).json({
            status: "SUCCESS",
            length: packages.length,
            data:{
                packages
            }
        })
    }catch(err) {
        res.status(500).json({
            status: "FAILED",
            message: err.message
        })
    }
};

