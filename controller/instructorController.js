const db = require("../models");
module.exports = {

    getCohorts: (req, res) => {
        console.log(req.params.id)
        db.Cohort.findAll({
            where: {
                instructorID: req.params.id
            }
        }).then(dbCohort => {
            console.log("\nCohorts Recieved")
            res.json(dbCohort)
        })
    },

    createCohort: (req, res) => {
        console.log("\nCreate Cohort")
        console.log(req.body)
        db.Cohort.create(req.body)
            .then(dbCohort => {
                console.log("\nCohort Created")
                res.json(dbCohort)
            })
    },

    // Get the students from the cohort
    getStudents: (req, res) => {
        console.log(req.params.id)
        // db.Cohort.findAll({})

    },

    createStudent: (req, res) => {
        console.log(req.body)
        
    }

}