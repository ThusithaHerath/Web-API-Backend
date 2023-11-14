const mongoose = require('mongoose');
const Schema = mongoose.Schema

const departureSchema = new Schema({
    departureDestination: String,
})

const DepartureSchema = mongoose.model('departureDestination', departureSchema)
module.exports = DepartureSchema