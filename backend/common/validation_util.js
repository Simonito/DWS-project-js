// thanks to a fellow 'too29bad' for this
// source: https://stackoverflow.com/questions/70637379/best-practice-to-validate-post-request-body

const { validationResult } = require('express-validator');

exports.validate = (schemas) => {
    return async (req, res, next) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const result = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }

        const errors = result.array();
        return res.status(400).send({
            message: 'Validation error',
            errors: errors,
        })
    };
}