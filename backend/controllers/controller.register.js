const userService = require('../entities/user/service');
const { cookieName } = require('../common/constants');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        // check user (if we already have an entry with that name)
        const userRes = await userService.readByName(req.body.username);
        if (userRes != null) {
            return res.status(409).json({'message': 'User already exists'});
        }

        // username is available, create the user
        const userId = await userService.create(req.body.username, req.body.password);

        const user = {
            id: userId,
            username: username,
        };
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie(cookieName, token);
        res.status(201).json({message: 'Successful registration'});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
    
};


module.exports = {
    register,
}