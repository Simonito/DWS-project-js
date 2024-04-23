const pool = require('./connection/db');
const dbresource = require('../common/db_resource');

const create = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, results) => {
            if (err) {
                reject(new dbresource.DatabaseError(err.message));
            } else {
                resolve(new dbresource.ResourceCreated());
            }
        });
    });
};

const read = async (query, params) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, results) => {
            if (err) {
                reject(new dbresource.DatabaseError(err.message));
            }
    
            if (results.rowCount == 0) {
                resolve(new dbresource.ResourceReadEmpty());
            } else {
                resolve(new dbresource.ResourceReadData(results.rows));
            }
        });
    });
};

const update = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, results) => {
            if (err) {
                reject(new dbresource.DatabaseError(err.message));
            } else {
                resolve(new dbresource.ResourceUpdated());
            }
        });
    });
};

const remove = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, results) => {
            if (err) {
                reject(new dbresource.DatabaseError(err.message));
            } else {
                resolve(new dbresource.ResourceDeleted());
            }
        });
    });
};

module.exports = {create, read, update, remove};