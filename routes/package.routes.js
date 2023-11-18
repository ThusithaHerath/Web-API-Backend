const PackageController = require('../controllers/packageController')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function (app) {
    app.post('/package/add', [
        AuthMiddleware.validJWTNeeded,
        PackageController.newPackage
    ]);

    app.get('/package/filter/',[
        AuthMiddleware.validJWTNeeded,
        PackageController.filter
    ]);
}