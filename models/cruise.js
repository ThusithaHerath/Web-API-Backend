const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cruiseSchema = new Schema({
    departureDestination: String,
    arrivalDestination: String,
    departureDate: Date,
    deck: String,
    cabinClass: String,
    price: Number,
    duration: Number,
    provider: String,
    mealPreferences: String,
    cabinSelection: String,
    image: String,
    title: String,
    description: String
})

const CruiseSchema = mongoose.model('cruise', cruiseSchema)
module.exports = CruiseSchema