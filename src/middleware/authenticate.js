const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const verifyPassword = require('../utils/bcrypt')

// Configure Passport LocalStrategy
passport.use(new LocalStrategy(
    function (username, password, done) {
        // Here, you would typically query the database to find a user with the given username
        // and then compare the password with the stored hash
        User.findOne({ username: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

// Serialize and deserialize user instances to and from the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport