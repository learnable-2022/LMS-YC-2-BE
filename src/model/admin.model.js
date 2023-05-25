const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    email_address:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        max: 50,
        unique : true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;