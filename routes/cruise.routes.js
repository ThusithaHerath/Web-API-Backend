const CruiseController = require('../controllers/cruiseController')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function (app) {
    app.post('/cruise/add', [
        CruiseController.newCruise
    ]);

    app.get('/cruise/filter/:option',[
        CruiseController.filter
    ]);
};