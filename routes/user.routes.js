const UserController = require('../controllers/user.controller')
const AuthMiddleware = require('../middleware/auth.middleware')

exports.routesConfig = function (app) {
    app.post('/login', [
        AuthMiddleware.isPasswordAndUserMatch,
        UserController.checkLogin
    ]);

    app.post('/register', [
        AuthMiddleware.isUserExist,
        AuthMiddleware.isPasswordsMatched,
        UserController.saveNewUser
    ]);

    app.get('/user', [
        AuthMiddleware.validJWTNeeded,
        UserController.getUsers
    ]);

    app.put('/user/:id', [
        AuthMiddleware.validJWTNeeded,
        UserController.putUser
    ]);

    app.delete('/user/:id', [
        AuthMiddleware.validJWTNeeded,
        UserController.deleteUser
    ]);
};
