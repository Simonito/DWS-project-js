const userService = require('../entities/test_user/test_service');
const { newSession } = require('../session/test_session');
const { cookieName } = require('../common/constants');

const login = async (req, res) => {
    try {
        // check user (if we have entry with that name)
        userRes = await userService.readByName(req.body.username);
        if (userRes == null) {
            return res.status(404).json({'message': 'User does not exist'});
        }

        // check password (hash)
        validPassword = userService.checkPassword(req.body.password, userRes.password);
        if (!validPassword) {
            return res.status(404).json({'message': 'Invalid password'});
        }

        // create session-id and connect to user-id and return 200 with the token as a cookie
        const sessionId = newSession(userRes.user_id);
        res.cookie(cookieName, sessionId, { maxAge: 3600, httpOnly: true });
        res.status(200).json({message: 'Successful login'});
    } catch {
        res.status(500).json({message: 'Server error'});
    }
    
};


module.exports = {
    login,
}