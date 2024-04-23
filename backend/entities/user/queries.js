const createUser = `
INSERT INTO users
(user_id, username, password)
VALUES ($1, $2, $3);
`;

const readUser = `
SELECT user_id, username, password
FROM users
WHERE user_id = $1;
`
const readUserByName = `
SELECT *
FROM users
WHERE username = $1;
`

const updateUser = `
UPDATE users
SET
    username = $2,
    password = $3,
WHERE user_id = $1;
`;

const deleteUser = `
DELETE FROM users
WHERE user_id = $1;
`

module.exports = {
    createUser,
    readUser,
    readUserByName,
    updateUser,
	deleteUser,
};