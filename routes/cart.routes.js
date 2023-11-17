const CartController = require('../controllers/cartController')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function (app) {
    app.post('/cart/add', [
        AuthMiddleware.validJWTNeeded,
        CartController.addToCart
    ]);
    app.post('/checkout', [
        AuthMiddleware.validJWTNeeded,
        CartController.checkout
    ]);
    app.get('/cart/:id', [
        AuthMiddleware.validJWTNeeded,
        CartController.getCart
    ]);
    app.get('/cart/remove/:cartId/:itemId', [
        AuthMiddleware.validJWTNeeded,
        CartController.removeItem
    ]);
};