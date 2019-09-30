const db = require("../models");
module.exports = {

    getAdmins: (req, res) => {
        db.Administrator.findAll()
            .then(dbAdmin => {
                res.json(dbAdmin)
            })
    },

    getInstructors: (req, res) => {
        db.Instructor.findAll()
            .then(dbInstructor => {
                res.json(dbInstructor)
            })
    },

    getStudents: (req, res) => {
        db.Student.findAll()
            .then(dbStudent => {
                res.json(dbStudent)
            })
    },

    // findAll: (req, res) => {
    //     console.log("Get all users")
    //     db.User.findAll()
    //         .then(dbUser => {
    //             console.log(dbUser)
    //             res.json(dbUser)
    //         })
    // },

    deleteAdmin: (req, res) => {
        console.log("Delete Admin")
        db.Administrator.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbAdmin => {
            let returnData = {
                color: 'green',
                message: "Admin Deleted"
            }
            res.json(returnData)

        })
    },

    deleteInstructor: (req, res) => {
        console.log("Delete Instructor")
        db.Instructor.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbInstructor => {
            let returnData = {
                color: 'green',
                message: "Instructor Deleted"
            }
            res.json(returnData)

        })
    },

    deleteStudent: (req, res) => {
        console.log("Delete Student")
        db.Student.destroy({
            where: {
                id: req.params.id
            }
        }).then(dbStudent => {
            let returnData = {
                color: 'green',
                message: "Student Deleted"
            }
            res.json(returnData)

        })
    },

    // deleteUser: (req, res) => {
    //     console.log("\nDeleting user")
    //     console.log(req.params.id)
    //     db.User.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(dbUser => {
    //         console.log("User Deleted")
    //         let returnData = {
    //             color: 'green',
    //             message: "User Deleted"
    //         }
    //         res.json(returnData)
    //     })
    // }
}