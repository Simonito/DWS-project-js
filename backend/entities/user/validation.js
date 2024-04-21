const { body } = require('express-validator');

const userSchema = [
    body('username').isString(),
    body('password').isString(),
];

const userUpdateSchema = [
    body('user_id').isUUID(),
    body('username').isString(),
    body('password').isString(),
];

module.exports = {
    userSchema,
    userUpdateSchema,
};