const CartController = require('../controllers/cartController')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function (app) {
    app.post('/cart/add', [
        CartController.addToCart
    ]);
};