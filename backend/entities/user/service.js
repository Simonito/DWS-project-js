const uuid_v4 = require('uuid').v4;
const bcrypt = require('bcrypt');
const queries = require('./queries');
const persistence = require('../../database/persistence');
const dbresource = require('../../common/db_resource');

const create = async (username, password) => {
    try {
        // hash the password here
        const id = uuid_v4();
        const hashed = await bcrypt.hash(password, 10);
        await persistence.create(queries.createUser, [id, username, hashed]);

        return id;
    } catch(error) {
        throw error;
    }  
};

const read = async (id) => {
    try {
        const res = await persistence.read(queries.readUser, [id]);
        return res instanceof dbresource.ResourceReadEmpty ? null : res.data[0];
    } catch(error) {
        throw error;
    }
};

const readByName = async (username) => {
    try {
        const res = await persistence.read(queries.readUserByName, [username]);
        if (res instanceof dbresource.ResourceReadEmpty) {
            return null;
        } else if (res instanceof dbresource.ResourceReadData) {
            return res.data[0];
        } else {
            throw new Error('Unexpected return type from persistence.read call');
        }
    } catch(error) {
        throw error;
    }
};

const readUserWithExpensesByUserId = async (id) => {
    try {
        const res = await persistence.read(queries.readUserExpensesById, [id]);
        if (res instanceof dbresource.ResourceReadEmpty) {
            return null;
        } else if (res instanceof dbresource.ResourceReadData) {
            return res.data;
        } else {
            throw new Error('Unexpected return type from persistence.read call');
        }
    } catch(error) {
        throw error;
    }
};

const update = async (id, username, password) => {
    try {
        // hash the password here:
        const hashed = await bcrypt.hash(password, 10);
        const res = await persistence.update(queries.updateUser, [id, username, hashed]);
        // consider doing something with the result
    } catch(error) {
        throw error;
    }
};

const remove = async (id) => {
    try {
        const res = await persistence.remove(queries.deleteUser, [id]);
    } catch(error) {
        throw error;
    }
};

const checkPassword = async (submitted, hashed) => {
    return await bcrypt.compare(submitted, hashed);
};

module.exports = {
    create,
    read,
    readByName,
    checkPassword,
    update,
    remove,

    readUserWithExpensesByUserId,
};