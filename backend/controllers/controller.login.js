const userService = require('../entities/user/service');
const { cookieName } = require('../common/constants');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        // check user (if we have entry with that name)
        const userRes = await userService.readByName(req.body.username);
        console.log(userRes);
        if (userRes == null) {
            return res.status(404).json({'message': 'User does not exist'});
        }

        // check password (hash)
        const validPassword = await userService.checkPassword(req.body.password, userRes.password);
        if (!validPassword) {
            return res.status(404).json({'message': 'Invalid password'});
        }

        delete userRes.password;

        console.log("before newSession");
        console.log({input: userRes, secret: process.env.JWT_SECRET});
        const token = jwt.sign(userRes, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log(token);
        res.cookie(cookieName, token);
        res.status(200).json({message: 'Successful login'});
    } catch(error) {
        console.dir(error);
        // consider logging the actual error
        res.status(500).json({message: 'Server error'});
    }
    
};

module.exports = {
    login,
}