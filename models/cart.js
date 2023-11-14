const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cartSchema = new Schema({
    travelAgentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    cruises:[{
        type: Array,
        ref: "cruise"
    },],
    activities:[{
        type: Array,
        ref: "activity"
    },],
    packages:[{
        type: Array,
        ref: "package"
    },],
    mealPreferences: String,
    cabinSelection: String

})

const CartSchema = mongoose.model('cart', cartSchema)
module.exports = CartSchema