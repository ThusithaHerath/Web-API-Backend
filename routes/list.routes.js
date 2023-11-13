const ListController = require('../controllers/listController')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function (app) {
    // arrival destination routes
    app.post('/arrival/add', [
        AuthMiddleware.validJWTNeeded,
        ListController.newArrivalDestination
    ]);

    app.get('/arrival', [
        AuthMiddleware.validJWTNeeded,
        ListController.getArrivalDestinations
    ]);

    // departure destination routes
    app.post('/departure/add', [
        AuthMiddleware.validJWTNeeded,
        ListController.newDepatureDestination
    ]);

    app.get('/departure', [
        AuthMiddleware.validJWTNeeded,
        ListController.getDepartureDestinations
    ]);

    // providers routes
    app.post('/provider/add', [
        AuthMiddleware.validJWTNeeded,
        ListController.newProvider
    ]);

    app.get('/provider', [
        AuthMiddleware.validJWTNeeded,
        ListController.getProviders
    ]);

};