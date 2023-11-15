const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  travelAgentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  cruises: [{
    title: String,
    mealPreferences: String,
    cabinSelection: String,
    price: Number
  }],
  activities: [{
    title: String,
    numberOfParticipants: Number,
    ageOfParticipants: Number,
    price: Number
  }],
  packages: [{
    title: String,
    price: Number
  }],
});

const CartSchema = mongoose.model('cart', cartSchema);
module.exports = CartSchema;
