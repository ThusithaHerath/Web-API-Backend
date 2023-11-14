const mongoose = require('mongoose');
const Schema = mongoose.Schema

const arrivalSchema = new Schema({
    arrivalDestination: String,
})

const ArrivalSchema = mongoose.model('arrivalDestination', arrivalSchema)
module.exports = ArrivalSchema