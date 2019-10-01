const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../models");
const bcrypt = require("bcryptjs")

function promiseToCheck(user) {
    return new Promise(resolve => {
        setTimeout(() => {
            let email = user.email;
            switch (user.type) {
                case "administrator":
                    db.Administrator.findOne({
                        where: {
                            email: email
                        }
                    }).then(admin => {
                        if (!admin) {
                            resolve(false)
                        } else {
                            console.log("\nFound Admin")
                            console.log(admin)

                            resolve(admin)

                        }
                    })
                    break
                case "instructor":
                    console.log('instructor')
                    db.Instructor.findOne({
                        where: {
                            email: email
                        }
                    }).then(instructor => {
                        resolve(instructor)
                    })
                    break
                case "student":
                    console.log('student')
                    db.Student.findOne({
                        where: {
                            email: email
                        }
                    }).then(student => {
                        resolve(student)
                    })
                    break
            }

        }, 1000)
    })
}

// let checkUser = function (user) {

// }

let createUser = function (user, pass) {
    let data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: pass,
        userType: user.type
    }
    switch (user.type) {
        case "administrator":
            db.Administrator.create(data)
                .then(admin => {
                    return admin
                })
            break
        case "instructor":
            db.Instructor.create(data)
                .then(instructor => {
                    return instructor
                })
            break
        case "student":
            db.Student.create(data)
                .then(student => {
                    return student
                })
            break
    }
}

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
            let passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
            console.log("\nSignup Begin")

            // Switch case to determine which Model will be used
            async function creatingUser() {
                let user = await promiseToCheck(req.body)
                if (user) return done(null, false)
                else {

                    let newUser = createUser(req.body, passwordHash)
                    if (newUser) return done(null, newUser)
                    return done(null, false)
                }

            }

            creatingUser();



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
                console.log("Compare pass")
                return bcrypt.compareSync(password, userpass)
            }

            // Here we should use an async await function
            // let user = checkUser(req.body)


            async function getUser() {
                let user = await promiseToCheck(req.body);
                console.log(user)
                console.log("\n After Promise")
                console.log(user)
                if (!user) return done(null, false)
                if (!isValidPassword(user.dataValues.password, password)) return done(null, false)
                let userInfo = user.get();
                console.log(userInfo)
                return done(null, userInfo)


            }
            getUser();



        }
    ))

    // This is a function that takes in the user and callback function
    passport.serializeUser(function (user, done) {
        console.log("Serialize")
        console.log(user)
        done(null, user)
    })

    passport.deserializeUser(function (user, done) {
        console.log("Deserialize")
        console.log(user)
        // Look in database for a user with same id
        done(null, user)
        // db.User.findOne({
        //     where: {
        //         id: id
        //     }
        // }).then(user => {
        //     // callback function to pass back user if a user with a matching id is found
        //     cb(null, user)
        // })
    })
}
