const express = require('express');
const app = express();
const router = express.Router();
const HomeControllers = require('../controllers/HomeControllers');
const UserController = require('../controllers/UserController');
const AdminAuth = require('../middleware/AdminAuth');

//Home
router.get('/', HomeControllers.index);

//User
router.get('/user', AdminAuth, UserController.index);
router.post('/user', UserController.create);
//router.get('/user/email', UserController.findUserEmail)
router.get('/user/id', UserController.findUser);
router.put('/user/', UserController.edit);
router.delete('/user/:id', UserController.remove)
router.post("/recoverpassword",UserController.recoverPassword);
router.post('/login', UserController.login);

//Recovere
router.post('/recoverpassword', UserController.recoverPassword);

module.exports = router;