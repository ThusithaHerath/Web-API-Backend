const mongoose = require("mongoose")
const Schema = mongoose.Schema

const activitySchema = new Schema({
    destination: String,
    date: Date,
    typeOfActivity: {
        type: String,
        enum: ['Adventure','Sight Seeing', 'Theme Park', 'Tour']
    },
    starRating: Number,
    price: Number,
    title: String,
    description: String
})
const ActivitySchema = mongoose.model('activity', activitySchema)
module.exports = ActivitySchema