const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
