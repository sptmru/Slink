const Router = require('express');
const authController = require('../controllers/authController');
const validationRegistration = require('../middleware/auth.middleware')

const router = new Router;

router.post('/login', authController.login);
router.post('/registration', validationRegistration, authController.registration);


module.exports = router;