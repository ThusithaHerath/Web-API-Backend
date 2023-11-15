const db = require("../config/mongo.init");
const Cart = require("../models/cart");
const mongoose = require('mongoose');

exports.addToCart = async (req, res) => {
  const { travelAgentId, cruises, mealPreferences, cabinSelection, activities, packages, numberOfParticipants, ageOfParticipants, price, title } = req.body;

  try {
    const cart = await Cart.findOne({ travelAgentId }).exec();

    if (!cart) {
      // If cart doesn't exist, create a new one
      const newCart = new Cart({
        travelAgentId,
        cruises: [],
        activities: [],
        packages: [],
      });
      await newCart.save();
    }

    if (cruises) {
      const { mealPreferences, cabinSelection, price, title } = req.body;
      cruises.forEach(async (cruise) => {
        cart.cruises.push({
          title: cruise.title,
          mealPreferences: cruise.mealPreferences,
          cabinSelection: cruise.cabinSelection,
          price: cruise.price,
        });
      });
    } else if (activities) {
      const { numberOfParticipants, ageOfParticipants, price, title } = req.body;

      activities.forEach(async (activity) => {
        cart.activities.push({
          title: activity.title,
          numberOfParticipants: activity.numberOfParticipants,
          ageOfParticipants: activity.ageOfParticipants,
          price: activity.price,
        });
      });
    } else if (packages) {
      const { price, title } = req.body;
      packages.forEach(async (package) => {
        cart.packages.push({
          title: package.title,
          price: package.price,
        });
      });
    }

    await cart.save();

    res.status(200).json({
      status: "SUCCESS",
      message: "Items added to the cart successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      message: err.message,
    });
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

exports.getCart = async (req, res) => {
  try {
      const travelAgentId = req.params.id; 

      const cartData = await Cart.findOne({ travelAgentId });

      if (!cartData) {
          return res.status(404).json({ error: 'Cart not found' });
      }

      return res.status(200).json(cartData);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};







  