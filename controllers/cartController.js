const db = require("../config/mongo.init");
const Cart = require("../models/cart");
const mongoose = require('mongoose');

exports.addToCart = async (req, res) => {
  const { travelAgentId, cruises, activities, packages } = req.body;

  try {
    const cart = await Cart.findOne({ travelAgentId }).exec();

    if (!cart) {
      // If cart doesn't exist, create a new one
      const newCart = new Cart({
        travelAgentId,
        cruises: [],
        activities: [],
        packages: [],
        total: 0
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

     // Calculate and update the total price
     const totalPrice = calculateTotalPrice(cart);
     cart.total = totalPrice;

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

// Function to calculate total price
function calculateTotalPrice(cart) {
  let total = 0;

  // Calculate total for cruises
  total += cart.cruises.reduce((acc, cruise) => acc + cruise.price, 0);

  // Calculate total for activities
  total += cart.activities.reduce((acc, activity) => acc + activity.price, 0);

  // Calculate total for packages
  total += cart.packages.reduce((acc, package) => acc + package.price, 0);

  return total;
}


exports.checkout = async (req, res) => {
  const { travelAgentId } = req.body;

  try {
    const cart = await Cart.findOne({ travelAgentId }).exec();

    if (!cart) {
      return res.status(404).json({
        status: "FAILED",
        message: "Cart not found for the specified travelAgentId",
      });
    }
    // Remove all items from the cart
    cart.cruises = [];
    cart.activities = [];
    cart.packages = [];
    cart.total = 0;

    await cart.save();

    res.status(200).json({
      status: "SUCCESS",
      message: "Checkout successful",
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILED",
      message: err.message,
    });
  }
};


exports.getCart = async (req, res) => {
  try {
      const travelAgentId = req.params.id; 

      const cartData = await Cart.findOne({ travelAgentId });

      return res.status(200).json(cartData);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};







  