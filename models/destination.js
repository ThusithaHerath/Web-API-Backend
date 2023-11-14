const mongoose = require('mongoose');
const Schema = mongoose.Schema

const destinationSchema = new Schema({
    destination: String,
})

const DestinationSchema = mongoose.model('destinations', destinationSchema)
module.exports = DestinationSchema