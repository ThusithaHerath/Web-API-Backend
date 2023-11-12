const db = require("../config/mongo.init");
const Activity = require("../models/activity");

exports.newActivity = async (req, res) => {
    let { destination, date, typeOfActivity, price, starRating } = req.body;

    if (!destination || !date || !typeOfActivity || !price ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newActivity = new Activity({
        destination,
        date,
        typeOfActivity,
        price,
        starRating
    });
    newActivity.save().then(result => {
        res.status(200).json({
            status: "SUCCESS",
            message: "New activity  added successfully",
            data: result,
        })
    }).catch(err => {
        res.status(500).json({
            status: "FAILED",
            message: "An error occured while saving activity !"
        })
    })
};

