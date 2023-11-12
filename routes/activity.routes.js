const ActivityController = require('../controllers/activityController')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function (app) {
    app.post('/activity/add', [
        ActivityController.newActivity
    ]);

    app.get('/activity/filter/',[
        ActivityController.filter
    ]);
};