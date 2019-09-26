const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../models");
const bcrypt = require("bcryptjs")

// The local authentication strategy authenticates users using a username and password. 
// The strategy requires a verify callback, which accepts these credentials and calls done providing a user.
module.exports = () => {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {
            // Hash password using bcrypt method genSaltSync to synchronously generate a Salt. We will go through 10 rounds of salting
            var passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {

                // If the user already exists, we will return a value of false. We can also add an additional message but that will be later on
                if (user) {
                    return done(null, false)

                } else {

                    var data = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: passwordHash,
                        image: req.body.image
                    }

                    console.log(`User data:`, data)

                    db.User.create(data)
                        .then(newUser => {

                            // If a new user was created, will return it back as a parameter for the callback done()
                            if (newUser) {
                                return done(null, newUser)

                            }

                            return done(null, false)

                        })

                }
            })
        }
    ))
    
    // Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {

            // This is a function that checks the login password against the database password for the email used. We use the bcrypt password compareSync to see if they are equal
            var isValidPassword = (userpass, password) => {
                return bcrypt.compareSync(password, userpass)
            }

            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {

                if (!user) {
                    return done(null, false)
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false)
                }

                // => What does this do? We know it logs in the user but how
                var userInfo = user.get();

                return done(null, userInfo)
            }).catch((err) => {
                console.log(err)
                // If this occurs, then there was something wrong with the login
                return done(null, false)
            })
        }


    ))
}
