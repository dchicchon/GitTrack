const passport = require("passport");
const mailgun = require("mailgun-js");
// const axios = require("axios");
const DOMAIN = "gittrack.ml";
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

// Strategies
const LocalStrategy = require("passport-local");
// const GithubStrategy = require("passport-github").Strategy;

// Database
const db = require("../models");

// Bcrypt to hash passwords
const bcrypt = require("bcryptjs")

// I created a promise because functions that are written after this function get executed too soon and require information from this
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

                // After creating user, lets send them an email to validate their account. If account is not validated, the account will be deleted
                // in 24 hrs


                console.log(`REQ BODY`)
                console.log(req.body.email)
                if (user) {
                    console.log("\nUser")
                    console.log(user)
                    return done(null, false)
                }
                else {

                    // If the email is not in our database and the email was validated, then we will send a confirmation email
                    let capitalizeName = req.body.firstName.replace(/^./, req.body.firstName[0].toUpperCase())

                    const data = {
                        from: "Daniel <danielchicchon@gmail.com>",
                        to: `${req.body.email}`,
                        subject: "Hello from GitTrack",
                        text:
                            `
                            Welcome to GitTrack ${capitalizeName},

                            Click on the link below to verify your email    

                            www.gittrack.ml

                            Take care!
                            Daniel
                            `
                    };
                    mg.messages().send(data, function (error, body) {
                        console.log(body);
                    });
                    let newUser = createUser(req.body, passwordHash)
                    if (newUser) return done(null, newUser)
                    return done(null, false)
                }

                // })


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

            // Async function to wait for promiseToCheck function to return a value for user
            async function getUser() {
                let user = await promiseToCheck(req.body);
                console.log(user)
                console.log("\n After Promise")
                console.log(user)
                if (!user) return done(null, false)

                // This is done because initally administrators are seeded initally with the deployment of the site
                if (req.body.type === 'administrator') {
                    if (user.dataValues.password === password) {
                        let userInfo = user.get();
                        console.log(userInfo);
                        return done(null, userInfo)
                    }
                } else {
                    if (!isValidPassword(user.dataValues.password, password)) return done(null, false)
                    let userInfo = user.get();
                    console.log(userInfo)
                    return done(null, userInfo)
                }

            }
            getUser();



        }
    ))

    // Github Authentication Strategy
    // passport.use(new GithubStrategy({
    //     clientID: process.env.GITHUB_CLIENT_ID,
    //     clientSecret: GITHUB_CLIENT_SECRET,
    //     callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    // },
    //     function (accessToken, refreshToken, profile, cb) {
    //         // Interact with db here
    //         db.User.findOrCreate({ email: profile.email })
    //             .then(dbUser => {
    //                 return cb(err, dbUser)
    //             })

    //     }
    // ))

    // This is a function that takes in the user and callback function
    passport.serializeUser(function (user, done) {
        console.log("Serialize")
        console.log(user)
        done(null, user)
    })

    passport.deserializeUser(function (user, done) {
        console.log("Deserialize")
        console.log(user)
        done(null, user)
    })
}
