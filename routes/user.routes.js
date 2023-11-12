const UserController = require('../controllers/user.controller')
const UploadController = require('../controllers/upload.controller')
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

    app.get('/document', [
        AuthMiddleware.validJWTNeeded,
        UserController.getDocuments,
    ]);
    
    app.post('/document', [
        AuthMiddleware.validJWTNeeded,
        UserController.saveDocument,
        UploadController.uploadDocument
    ]);

    app.put('/document/:id', [
        AuthMiddleware.validJWTNeeded,
        UploadController.updateDocument
    ]);

    app.delete('/document/:id', [
        AuthMiddleware.validJWTNeeded,
        UploadController.deleteDocument
    ]);


};
