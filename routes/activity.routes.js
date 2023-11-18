const ActivityController = require('../controllers/activityController')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function (app) {
    app.post('/activity/add', [
        AuthMiddleware.validJWTNeeded,
        ActivityController.newActivity
    ]);

    app.get('/activity/filter/',[
        AuthMiddleware.validJWTNeeded,
        ActivityController.filter
    ]);
};