const db = require("../models");
module.exports = {
    findAll: (req, res) => {
        console.log("Get all users")
        db.User.findAll()
            .then(dbUser => {
                console.log(dbUser)
                res.json(dbUser)
            })
    },

    deleteUser: (req, res) => {
        console.log("\nDeleting user")
        console.log(req.params.id)
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbUser => {
            console.log("User Deleted")
            let returnData = {
                color: 'green',
                message: "User Deleted"
            }
            res.json(returnData)
        })
    }
}