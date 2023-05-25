const { ObjectId } = require('mongodb')

export const isValidId = (id) => {
    return ObjectId.isValid(id);
};