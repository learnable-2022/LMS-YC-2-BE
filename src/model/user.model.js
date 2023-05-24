const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    parent_name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    relationship: {
        type: String,
        required: true,
        trim: true,
    },

    child_name: {
        type: String,
        required: true,
        trim: true,
    },

    child_class: {
        type: String,
        required: true,
        trim: true,
    },

    DOB: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        trim: true,
        minlength: 5,
        required: true,
    },

},
    { immutable: true },
    { timestamps: true }
);
const user = mongoose.model('user', userSchema)
module.exports = { user }