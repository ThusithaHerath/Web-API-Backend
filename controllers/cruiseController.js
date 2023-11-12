const db = require("../config/mongo.init");
const Cruise = require("../models/cruise");

exports.newCruise = async (req, res) => {
    let { departureDestination, arrivalDestination, departureDate, deck, cabinClass, price, duration, provider, mealPreferences, cabinSelection } = req.body;

    if (!departureDestination || !arrivalDestination || !departureDate || !deck || !cabinClass || !price || !duration || !provider || !mealPreferences || !cabinSelection) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newCruise = new Cruise({
        departureDestination,
        arrivalDestination,
        departureDate,
        deck,
        cabinClass,
        price,
        duration,
        provider,
        mealPreferences,
        cabinSelection
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
};

exports.filter = async (req, res) =>{
    const option = req.params.option;
    res.json({option})  
};


  
