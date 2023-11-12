const mongoose = require("mongoose")
const Schema = mongoose.Schema

const packageSchema = new Schema({
    destination: String,
    duration: Date,
    numberOfTravelers:Number,
    speciality: {
        type: String,
        enum: ['Honeymoon','Beach holody', 'Wildlife excursion', 'Family holiday']
    },
    packageRating: Number,
    price: Number
})
const PackageSchema = mongoose.model('Package', packageSchema)
module.exports = PackageSchema