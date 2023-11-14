const db = require("../config/mongo.init");
const Cart = require("../models/cart");
const mongoose = require('mongoose');

exports.addToCart = async (req, res) => {
  const { travelAgentId, cruises, mealPreferences, cabinSelection, activities, packages, numberOfParticipants, ageOfParticipants } = req.body;

  if (cruises) {
    try {
        const cart = await Cart.findOne({ travelAgentId }).exec();
    
          const newCart = new Cart({
            travelAgentId,
            cruises,
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
  } if(activities){
    try {
        const cart = await Cart.findOne({ travelAgentId }).exec();
    
          const newCart = new Cart({
            travelAgentId,
            activities,
            numberOfParticipants,
            ageOfParticipants
          });
          await newCart.save();
    
        res.status(200).json({
          status: "SUCCESS",
          message: "Activities added to the cart successfully",
        });
      } catch (err) {
        res.status(500).json({
          status: "FAILED",
          message: err.message,
        });
      }
  } if(packages){
    try {
        const cart = await Cart.findOne({ travelAgentId }).exec();
    
          const newCart = new Cart({
            travelAgentId,
            packages,
            mealPreferences,
            cabinSelection,
          });
          await newCart.save();
    
        res.status(200).json({
          status: "SUCCESS",
          message: "Packages added to the cart successfully",
        });
      } catch (err) {
        res.status(500).json({
          status: "FAILED",
          message: err.message,
        });
      }
  }
};

exports.checkout = async (req, res) => {
    const { travelAgentId, paymentInfo, billingInfo, contactInfo } = req.body;
  
    await Cart.findOneAndDelete({ travelAgentId });
  
    res.status(200).json({
      status: "SUCCESS",
      message: "Checkout successful",
    });
  };
  