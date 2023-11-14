const db = require("../config/mongo.init");
const Cart = require("../models/cart");
const mongoose = require('mongoose');

exports.addToCart = async (req, res) => {
  const { travelAgentId, cruises, mealPreferences, cabinSelection } = req.body;

  try {
    const cart = await Cart.findOne({ travelAgentId }).exec();


      const newCart = new Cart({
        travelAgentId,
        cruises: cruises,
        mealPreferences,
        cabinSelection,
      });

      await newCart.save();
   

    res.status(200).json({
      status: "SUCCESS",
      message: "Cruise added to the cart successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      message: err.message,
    });
  }
};
