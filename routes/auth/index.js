// This file handles the routing for authentication requests
const router = require("express").Router();
const passport = require("passport");
const authController = require("../../controller/authController");


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

router.post('/signup')

router.route("/logout")
    .get(authController.logout)
module.exports = router;