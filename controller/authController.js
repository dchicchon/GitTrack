// const db = require("db")

module.exports = {
    login: (req, res) => {
        console.log("Request Body")
        console.log(req.body)

        res.json("Login")

        // Do Passport Login here
    }
}