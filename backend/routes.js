const { Router } = require('express');
const login_ctrl = require('./controllers/controller.login');
const { userSchema } = require('./entities/user/validation');
const { validate } = require('./common/validation_util');

const router = Router();

router.post('/login', validate(userSchema), (req, res) => {
    login_ctrl.login(req, res);
});

router.get('/:flight_no/load-week', (req, res) => {
    controller.getAirlineDailyLoad(req, res);
});

module.exports = router;