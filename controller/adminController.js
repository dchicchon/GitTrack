const db = require("../models");
module.exports = {
    findAll: (req, res) => {
        console.log("Get all users")
        db.User.findAll()
            .then(dbUser => {
                console.log(dbUser)
                res.json(dbUser)
            })
    }
}