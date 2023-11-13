const CruiseController = require('../controllers/cruiseController')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function (app) {
    app.post('/cruise/add', [
        AuthMiddleware.validJWTNeeded,
        CruiseController.newCruise
    ]);

    app.get('/cruise/filter/',[
        AuthMiddleware.validJWTNeeded,
        CruiseController.filter
    ]);
};