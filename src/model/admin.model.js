const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const rounds = parseInt(process.env.ROUNDS)
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
adminSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew('password')) {
        const salt = await bcrypt.genSalt(rounds);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

adminSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        const salt = await bcrypt.genSalt(rounds);
        update.password = await bcrypt.hash(update.password, salt);
    }
    next();
});


const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
