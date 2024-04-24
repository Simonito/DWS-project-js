const queries = require('./queries');
const persistence = require('../../database/persistence');
const dbresource = require('../../common/db_resource');

const read = async (id) => {
    try {
        const res = await persistence.read(queries.readUser, [id]);
        return res instanceof dbresource.ResourceReadEmpty ? null : res.data[0];
    } catch(error) {
        throw error;
    }
};

const readAll = async () => {
    try {
        const res = await persistence.read(queries.readCategories);
        return res instanceof dbresource.ResourceReadEmpty ? null : res.data;
    } catch(error) {
        throw error;
    }
};

module.exports = {
    read,
    readAll,
};