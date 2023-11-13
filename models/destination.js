const mongoose = require('mongoose');
const Schema = mongoose.Schema

const destinationSchema = new Schema({
    destination: String,
})

const DestinationSchema = mongoose.model('Destinations', destinationSchema)
module.exports = DestinationSchema