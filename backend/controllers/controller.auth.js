const { getUserBySession } = require('../session/session');
const { cookieName } = require('../common/constants');

const authenticateCookie = async (req, res) => {
    try {
        // check if cookie is set
        const sessionId = req.cookies[cookieName];
        if (sessionId == null) {
            return res.status(401).json({message: 'Unauthorized, log in!'});
        }

        // sessionId was passed as a cookie, verify if it exists in our memory
        const userId = getUserBySession(sessionId);
        if (userId == null) {
            // the given cookie is not tracked as our sessionId
            // destroy the cookie
            res.clearCookie(cookieName);
            return res.status(401).json({message: 'Malformed cookie, log in!'});
        }

        // user authenticated with cookie that represents the sessionId
        return res.status(200).json({message: 'Authenticated'});
    } catch {
        res.status(500).json({message: 'Server error'});
    }
    
};


module.exports = {
    authenticateCookie,
}