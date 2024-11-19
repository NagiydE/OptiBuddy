// config/passport.js

const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user'); // Mongoose User model

module.exports = function(passport) {

    // =========================================================================
    // Passport Session Setup ==================================================
    // =========================================================================
    passport.serializeUser((user, done) => {
        done(null, user.id); // Store user ID in session
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => { // Use Mongoose to find user by ID
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        // Check if user already exists
        User.findOne({ 'local.email': email }, (err, user) => {
            if (err) return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                // Create a new user
                const newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save((err) => {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }
        });
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        // Find the user by email
        User.findOne({ 'local.email': email }, (err, user) => {
            if (err) return done(err);

            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }

            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }

            return done(null, user);
        });
    }));
};
