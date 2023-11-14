const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cruiseSchema = new Schema({
    departureDestination: String,
    arrivalDestination: String,
    departureDate: Date,
    arrivalDate: Date,
    deck: String,
    price: Number,
    duration: Number,
    provider: String,
    mealPreferences: Array,
    cabinClass: Array,
    image: String,
    title: String,
    description: String
})

const CruiseSchema = mongoose.model('cruise', cruiseSchema)
module.exports = CruiseSchema