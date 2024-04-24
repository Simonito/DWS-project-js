const { Router } = require('express');
const loginController = require('./controllers/controller.login');
const registerController = require('./controllers/controller.register');
const userController = require('./controllers/controller.user');
const categoryController = require('./controllers/controller.categorie');
const { userSchema } = require('./entities/user/validation');
const { validate } = require('./common/validation_util');
const { cookieJwtAuth } = require('./common/jwtAuthentication');

const router = Router();

router.post('/login', validate(userSchema), (req, res) => {
    loginController.login(req, res);
});

router.post('/register', validate(userSchema), (req, res) => {
    registerController.register(req, res);
});

router.get('/', cookieJwtAuth, (req, res) => {
});

router.get('/test', (req, res) => {
    return res.status(200).json({message: 'test'});
})

router.get('/users/expenses', cookieJwtAuth, (req, res) => {
    userController.userExpenses(req, res);
});

router.get('/categories', cookieJwtAuth, (req, res) => {
    categoryController.categories(req, res);
});

module.exports = router;