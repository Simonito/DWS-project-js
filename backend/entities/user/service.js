const uuid_v4 = require('uuid').v4;
const bcrypt = require('bcrypt');

const queries = require('./queries');
const persistence = require('../../database/persistence');
const dbresource = require('../../common/db_resource');

const create = async (username, password) => {
    // hash the password here
    const id = uuid_v4();
    const hashed = await bcrypt.hash(password, 10);
    const res = await persistence.create(queries.createUser, [id, username, hashed]);

    if (res instanceof dbresource.ResourceCreated) {
        // TODO: might be good idea to actually return something here;
        return;
    } else if (res instanceof dbresource.DatabaseError) {
        throw new Error(res.message);
    } // maybe even handle the other types, although we know they cannot be returned from that function called on `persistance`
    else {
        throw new Error('Unexpected error');
    }
};

const read = async (id) => {
    const res = await persistence.read(queries.readUser, [id]);

    if (res instanceof dbresource.ResourceRead) {
        return res instanceof dbresource.ResourceReadEmpty ? null : res.data[0];
    } else if (res instanceof dbresource.DatabaseError) {
        throw new Error(res.message);
    } else {
        throw new Error('Unexpected error');
    }
};

const readByName = async (username) => {
    const res = await persistence.read(queries.readUserByName, [username]);

    if (res instanceof dbresource.ResourceRead) {
        return res instanceof dbresource.ResourceReadEmpty ? null : res.data[0];
    } else if (res instanceof dbresource.DatabaseError) {
        throw new Error(res.message);
    } else {
        throw new Error('Unexpected error');
    }
};

const checkPassword = async (submitted, hashed) => {
    return await bcrypt.compare(submitted, hashed);
};

const update = async (id, username, password) => {
    // hash the password here:

    const res = await persistence.update(queries.updateUser, [id, username, password]);

    if (res instanceof dbresource.ResourceUpdated) {
        // TODO: consider returning some data
        return;
    } else if (res instanceof dbresource.DatabaseError) {
        throw new Error(res.message);
    } else {
        throw new Error('Unexpected error');
    }
};

const remove = async (id) => {
    const res = await persistence.remove(queries.deleteUser, [id]);

    if (res instanceof dbresource.ResourceDeleted) {
        // TODO: consider returning some data
        return;
    } else if (res instanceof dbresource.DatabaseError) {
        throw new Error(res.message);
    } else {
        throw new Error('Unexpected error');
    }
};

module.exports = {
    create,
    read,
    readByName,
    checkPassword,
    update,
    remove,
};