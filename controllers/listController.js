const db = require("../config/mongo.init");
const Provider = require("../models/provider");
const ArrivalDestination = require("../models/arrivalDestination");
const DepatureDestination = require("../models/departureDestinations");


//arrival functions

exports.newArrivalDestination = async (req, res) => {
    let { arrivalDestination} = req.body;

    const newDestination = new ArrivalDestination({
        arrivalDestination
    });
    newDestination.save().then(result => {
        res.status(200).json({
            status: "SUCCESS",
            message: "New arrival destination  added successfully",
            data: result,
        })
    }).catch(err => {
        res.status(500).json({
            status: "FAILED",
            message: "An error occured while saving destination !"
        })
    })
};

exports.getArrivalDestinations = (req, res) => {
    ArrivalDestination.find().then((destinations) => {
        res.status(200).send({
            status: "SUCCESS",
            message: "Retrieved arrival destinations successfully",
            data: destinations
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).send({     
        status: "FAILED",
        message: "An error occurred while retrieving arrival destinations.",
        error: err })
    })
};


//departure functions

exports.newDepatureDestination = async (req, res) => {
    let { departureDestination} = req.body;

    const newDestination = new DepatureDestination({
        departureDestination
    });
    newDestination.save().then(result => {
        res.status(200).json({
            status: "SUCCESS",
            message: "New departure destination  added successfully",
            data: result,
        })
    }).catch(err => {
        res.status(500).json({
            status: "FAILED",
            message: "An error occured while saving destination!"
        })
    })
};

exports.getDepartureDestinations = (req, res) => {
    DepatureDestination.find().then((destinations) => {
        res.status(200).send({
            status: "SUCCESS",
            message: "Retrieved departure destinations successfully",
            data: destinations
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).send({     
        status: "FAILED",
        message: "An error occurred while retrieving departure destinations.",
        error: err })
    })
};


//provider functions

exports.newProvider = async (req, res) => {
    let { provider} = req.body;

    const newProvider= new Provider({
        provider
    });
    newProvider.save().then(result => {
        res.status(200).json({
            status: "SUCCESS",
            message: "New provider added successfully",
            data: result,
        })
    }).catch(err => {
        res.status(500).json({
            status: "FAILED",
            message: "An error occured while saving provider!"
        })
    })
};

exports.getProviders = (req, res) => {
    Provider.find().then((providers) => {
        res.status(200).send({
            status: "SUCCESS",
            message: "Retrieved providers successfully",
            data: providers
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).send({     
        status: "FAILED",
        message: "An error occurred while retrieving providers.",
        error: err })
    })
};

