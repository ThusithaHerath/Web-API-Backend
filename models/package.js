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
    price: Number,
    title: String,
    description: String
})
const PackageSchema = mongoose.model('package', packageSchema)
module.exports = PackageSchema