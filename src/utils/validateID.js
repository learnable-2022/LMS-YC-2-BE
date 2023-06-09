const { ObjectId } = require('mongodb');

const checkValidId = (id) => {
    //validate the user id
    try {
        return ObjectId.isValid(id);
    } catch (error) {
        return false;
    }
};
module.exports = checkValidId