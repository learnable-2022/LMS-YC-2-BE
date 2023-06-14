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
adminSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew('password')) {
        const salt = await bcrypt.genSalt(rounds);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
