const redis = require('./redisconn');
const uuid = require('uuid').v4;

const newSession = (userId) => {
    const sessionId = uuid();
    redis.set(sessionId, userId);

    return sessionId;
};

const terminateSession = (sessionId) => {
    redis.del(sessionId);
};

const getUserBySession = async (sessionId) => {
    return await redis.get(sessionId);
};

module.exports = {
    newSession,
    terminateSession,
    getUserBySession,
};