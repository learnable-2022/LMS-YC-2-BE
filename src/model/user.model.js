const mongoose = require('mongoose')
const { ENUM } = require('../config/constant.config')
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
        unique: true,
        lowercase: true,
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

    gender: {
        type: String,
        required: true,
        trim: true,
    },

    track: {
        type: String,
        trim: true,
        default: ENUM.VALUE
    },

    course: {
        type: String,
        default: ENUM.COURSE
    },

    register: {
        type: String,
        trim: true,
        default: ENUM.REG
    },

    DOB: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        trim: true,
        required: true,
    },

},
    { timestamps: true }
);
const user = mongoose.model('user', userSchema)
module.exports = user