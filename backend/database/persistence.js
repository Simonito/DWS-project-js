const pool = require('./connection/db');
const dbresource = require('../common/db_resource');

const create = (query, params) => {
    pool.query(query, params, (err, results) => {
        if (err) {
            return new dbresource.DatabaseError(err.message);
        } else {
            return new dbresource.ResourceCreated();
        }
    });
};

const read = (query, params) => {
    pool.query(query, params, (err, results) => {
        if (err) {
            return new dbresource.DatabaseError(err.message);
        }

        if (results.rowCount == 0) {
            return new dbresource.ResourceReadEmpty();
        } else {
            return new dbresource.ResourceReadData(results.rows);
        }
    });
};

const update = (query, params) => {
    pool.query(query, params, (err, results) => {
        if (err) {
            return new dbresource.DatabaseError(err.message);
        } else {
            return new dbresource.ResourceUpdated();
        }
    });
};

const remove = (query, params) => {
    pool.query(query, params, (err, results) => {
        if (err) {
            return new dbresource.DatabaseError(err.message);
        } else {
            return new dbresource.ResourceDeleted();
        }
    });
};

module.exports = {create, read, update, remove};