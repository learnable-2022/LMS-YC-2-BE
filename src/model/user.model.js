const mongoose = require('mongoose');
const Schema = mongoose.Schema
const rounds = parseInt(process.env.ROUNDS)
const bcrypt = require('bcrypt')
const { ENUM } = require('../config/constant.config')

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

    quiz: {
        type: Number,
        trim: true,
        default: ENUM.QUIZ
    },

    progress: {
        type: String,
        trim: true,
        default: ENUM.PROGRESS
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

    watchedVideos: {
        type: Array,
        trim: true,
        default: []
    },

    badges: {
        type: Number,
        trim: true,
        default: ENUM.BADGES
    }

},
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew('password')) {
        const salt = await bcrypt.genSalt(rounds);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        const salt = await bcrypt.genSalt(rounds);
        update.password = await bcrypt.hash(update.password, salt);
    }
    next();
});
const user = mongoose.model('user', userSchema)
module.exports = user