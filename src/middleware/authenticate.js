const LocalStrategy = require('passport-local').Strategy;
const Users = require('../model/user.model');
const Admin = require('../model/admin.model')
const bcrypt = require('bcrypt')
// const usersServices = require('../services/user.services')
// const { getAUserByEmail } = usersServices
const adminService = require('../services/admin.services')


function initialise(passport, Users, Admin) {

    const authenticateUser = async (email, password, done) => {
        try {
            let user = await Users.findOne({ email: email });
            let adminUser = await Admin.findOne({ email: email });

            if (!user && !adminUser) {
                return done(null, false, { message: 'No user with such email' });
            }

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user);
                }
            }

            if (adminUser) {
                const isMatch = await bcrypt.compare(password, adminUser.password);
                if (isMatch) {
                    return done(null, adminUser);
                }
            }

            return done(null, false, { message: 'Incorrect password' });
        } catch (error) {
            return done(error);
        }
    }

    // Configure Passport LocalStrategy for Users
    passport.use('local', new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    // Configure Passport LocalStrategy for Admin
    passport.use('local', new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser(function (user, done) {
        if (user instanceof Users) {
            done(null, { id: user.id, type: 'user' });
        } else if (user instanceof Admin) {
            done(null, { id: user.id, type: 'admin' });
        } else {
            done(new Error('Invalid user type'));
        }
    });

    passport.deserializeUser(async function (userObj, done) {
        try {
            if (userObj.type === 'user') {
                const user = await Users.findById(userObj.id);
                done(null, user);
            } else if (userObj.type === 'admin') {
                const adminUser = await Admin.findById(userObj.id);
                done(null, adminUser);
            } else {
                done(new Error('Invalid user type'));
            }
        } catch (err) {
            done(err);
        }
    });
}

module.exports = initialise;












