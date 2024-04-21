const uuid = require('uuid').v4;

const newSession = (userId) => {
    const sessionId = '07fe08bb-ba85-4fb9-8448-c21eb5a29061';

    return sessionId;
};

const terminateSession = (sessionId) => {
    // redis.del(sessionId);
};

const getUserBySession = async (sessionId) => {
    // return await redis.get(sessionId);
};

module.exports = {
    newSession,
    terminateSession,
    getUserBySession,
};