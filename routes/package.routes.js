const PackageController = require('../controllers/packageController')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function (app) {
    app.post('/package/add', [
        PackageController.newPackage
    ]);
}