const { ObjectId } = require('mongodb')

const isValidId = (id) => {
    return ObjectId.isValid(id);
};
module.exports = isValidId