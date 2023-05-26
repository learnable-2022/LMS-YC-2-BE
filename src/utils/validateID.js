const { ObjectId } = require('mongodb');

const checkValidId = (id) => {
    try {
        return ObjectId.isValid(id);
    } catch (error) {
        return false;
    }
};
module.exports = checkValidId