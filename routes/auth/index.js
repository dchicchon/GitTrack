// This file handles the routing for authentication requests
const router = require("express").Router();
const passport = require("passport");
const db = require("../../models");
// const authController = require("../../controller/authController");

router.get('/user', (req, res) => {
    // Req has a method that checks for authentication
    if (req.isAuthenticated()) {
        var currentUser = req.session.passport.user;
        console.log("\nREQ SESSION:")
        console.log(req.session);
        console.log("\nCurrent User");
        console.log(currentUser)

        switch (currentUser.userType) {
            case "administrator":
                db.Administrator.findOne({
                    where: {
                        id: currentUser.id
                    }
                }).then(dbAdmin => {
                    console.log("Admin")
                    console.log(dbAdmin)
                    let user = {
                        loggedIn: true,
                        type: currentUser.type,
                        user: currentUser,
                    };
                    res.json(user);

                })
                break
            case "instructor":
                db.Instructor.findOne({
                    where: {
                        id: currentUser.id
                    }
                }).then(dbInstructor => {
                    console.log("Instructor")
                    console.log(dbInstructor)
                    let user = {
                        loggedIn: true,
                        type: currentUser.type,
                        user: currentUser,
                    };
                    res.json(user);

                })
                break
            case "student":
                db.Student.findOne({
                    where: {
                        id: currentUser.id
                    }
                }).then(dbStudent => {
                    console.log(dbStudent)
                    let user = {
                        loggedIn: true,
                        type: currentUser.type,
                        user: currentUser,
                    };
                    res.json(user);

                })
                break
        }
        // db.User.findOne({
        //     where: {
        //         id: currentUser
        //     }
        // }).then(dbUser => {
        //     // dbUser is the found user information that matches the authenticated user
        //     console.log(dbUser)
        //     let user = {
        //         loggedIn: true,
        //         type: currentUser.type,
        //         user: currentUser,
        //     };

        //     res.json(user);
        // })
    } else {
        let noUser = {
            loggedIn: false,
            user: {
                userType: ''
            }
            // userType: ''
        };
        res.json(noUser);
    }
})

// Github User Authentication using OAuth2
// router.get("/login/github",
//     passport.authenticate('github'));

// router.get("/auth/github/callback",
//     passport.authenticate('github', { failureRedirect: '/login' }),
//     function (req, res) {
//         res.redirect('/')
//     })

router.post("/login", (req, res, next) => {
    // Authenticate Login using strategy in passport.js file
    passport.authenticate("local-login", (err, user, info) => {

        // We use the return DataObject to send messages to the front end in case of error logging in or on success


        // Auth Error
        if (err) return next(err)

        // No User
        if (!user) {
            let returnData = {
                message: 'Not a user in the database',
                color: 'red'
            }
            res.json(returnData)
        }

        // Successful Login
        req.login(user, (err) => {
            if (err) return next(err)

            let returnData = {
                color: 'green',
                message: 'Success!'
            }
            return res.json(returnData)
        })
    })(req, res, next)
})

router.post('/signup', (req, res, next) => {
    console.log("\nhit signup route")
    console.log(req.body)

    // This will first execute the local signup method in passport.js, log the user in, then redirect the user to the root page
    passport.authenticate("local-signup", (err, user, info) => {
        if (err) {
            return next(err)
        }

        if (!user) {
            console.log("User exists")
            let returnData = {
                color: 'red',
                // error: false
                message: 'User Exists'
            }
            return res.json(returnData)
        }

        if (user) {
            console.log("user created")
            let returnData = {
                color: 'green',
                // error: false,
                message: 'User Created'
            }
            res.json(returnData)


            // The user is now logged in
            // req.login(user, err => {
            //     if (err) {
            //         return next(err)
            //     }

            //     return res.redirect("/")
            // })
        }


    })(req, res, next)
})

router.get("/logout", (req, res) => {

    // Based on that request, we know that the authenticated user is no longer authenticated and is now logged out
    req.logout()
    if (!req.user) {
        res.redirect("/")
    } else {
        console.log("Failed Logout")
    }
})

module.exports = router;