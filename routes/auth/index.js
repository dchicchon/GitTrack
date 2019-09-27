// This file handles the routing for authentication requests
const router = require("express").Router();
const passport = require("passport");
const db = require("../../models");
const authController = require("../../controller/authController");

router.get('/user', (req, res) => {
    // Req has a method that checks for authentication
    if (req.isAuthenticated()) {
        var currentUser = req.session.passport.user;
        console.log("REQ SESSION:")
        console.log(req.session);
        db.User.findOne({
            where: {
                id: currentUser
            }
        }).then(dbUser => {
            // dbUser is the found user information that matches the authenticated user
            console.log(dbUser)
            var user = {
                loggedIn: true,
                type: currentUser.type,
                user: currentUser,
            };

            console.log(user)
            res.json(user);
        })
    } else {
        var noUser = {
            loggedIn: false,
            type: ''
        };
        res.json(noUser);
    }
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local-login", (err, user, info) => {
        if (err) return next(err)
        if (!user) res.send("Not a user in the database")


        req.login(user, (err) => {
            if (err) return next(err)

            let userI = {
                message: 'Success!'
            }
            return res.json(userI)
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
            let message = {
                error: true
            }
            return res.json(message)
        }

        // The user is now logged in
        console.log("user logged in")
        req.login(user, err => {
            if (err) {
                return next(err)
            }

            return res.redirect("/")
        })
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