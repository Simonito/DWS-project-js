const jwt = require('jsonwebtoken');
const { cookieName } = require('./constants');

exports.cookieJwtAuth = (req, res, next) => {
    const token = req.cookies[cookieName];
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.status(500).json({message: 'Malformed JWT cookie'});
    }
};