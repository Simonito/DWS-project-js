const userService = require('../entities/user/service');
const { newSession } = require('../session/session');
const { cookieName } = require('../common/constants');

const register = async (req, res) => {
    try {
        // check user (if we already have an entry with that name)
        userRes = await userService.readByName(req.body.username);
        if (userRes != null) {
            return res.status(409).json({'message': 'User already exists'});
        }

        // username is available, create the user
        userService.create(req.body.username, req.body.password);

        // create session-id and connect to user-id and return 200 with the token as a cookie
        const sessionId = newSession(userRes.user_id);
        res.cookie(cookieName, sessionId, { maxAge: 3600, httpOnly: true });
        res.status(201).json({message: 'Successful registration'});
    } catch {
        res.status(500).json({message: 'Server error'});
    }
    
};


module.exports = {
    register,
}