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
    price: Number
})
const ActivitySchema = mongoose.model('Activity', activitySchema)
module.exports = ActivitySchema