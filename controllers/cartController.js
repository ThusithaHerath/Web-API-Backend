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

exports.removeItem = async (req, res) => {
  const itemId = req.params.itemId; 
  const cartId = req.params.cartId;

  try {
    console.log(cartId);
    
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({ message: 'Invalid cartId' });
    }

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    let itemType;
    if (cart.packages.some(item => item._id.toString() === itemId)) {
      itemType = 'packages';
    } else if (cart.activities.some(item => item._id.toString() === itemId)) {
      itemType = 'activities';
    } else if (cart.cruises.some(item => item._id.toString() === itemId)) {
      itemType = 'cruises';
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart[itemType] = cart[itemType].filter(item => item._id.toString() !== itemId);

    cart.total = calculateTotal(cart);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item removed successfully', cart });

    res.json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const calculateTotal = (cart) => {
  let total = 0;

  // Sum up the prices in packages, activities, and cruises arrays
  total += cart.packages.reduce((acc, item) => acc + item.price, 0);
  total += cart.activities.reduce((acc, item) => acc + item.price, 0);
  total += cart.cruises.reduce((acc, item) => acc + item.price, 0);

  return total;
};





  