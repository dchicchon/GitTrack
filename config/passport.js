const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../models");

// The local authentication strategy authenticates users using a username and password. 
// The strategy requires a verify callback, which accepts these credentials and calls done providing a user.
passport.use(new LocalStrategy(
    function (email, password, done) {
        db.User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err) }
            if (!user) { return done(null, false) }
            if (!user.verifyPassword(password)) { return done(null, false) }
            return done(null, user)
        })
    }
))