// const db = require("db")
const db = require("../models");
const passport = require("passport");
module.exports = {
    login: (req, res) => {
        // console.log('Login')
        // console.log(req.body)

        // passport.authenticate('local', { failureRedirect: '/login' }),
        //     function (req, res) {
        //         console.log("After Authenticate")

        //         res.redirect('/')
        //     }


        // Based on the req.body, we want to authenticate the user


        // res.json("Login")

        // Do Passport Login here
    },

    signup: (req, res) => {
        console.log('Signup')
        console.log(req.body)
        res.json('SignUp')
    },

    logout: (req, res) => {
        console.log("LogOut");
        console.log(req.params.id)
    }
}