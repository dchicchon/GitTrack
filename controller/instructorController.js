const db = require("../models");
module.exports = {

    getCohorts: (req, res) => {
        console.log(req.params.id)
        db.Cohort.findAll({
            where: {
                instructorID: req.params.id
            }
        }).then(dbCohort => {
            console.log(dbCohort)
            res.json(dbCohort)
        })
    },

    createCohort: (req, res) => {
        console.log(req.body)
        // db.Cohort.create({

        // })
    },

    // Get the students from the cohort
    getStudents: (req, res) => {
        console.log(req.params.id)
        // db.Cohort.findAll({})

    },

}