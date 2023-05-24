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

    isDeleted: {
        type: Boolean,
        default: false,
    }
},
    { immutable: true },
    { timestamps: true }
);

userSchema.pre('remove', function (next) {
    this.isDeleted = false;
    this.save();
    next();
});

const userModel = mongoose.model('user', userSchema)
export default userModel