const db = require("../models");
module.exports = {
    getInfo: (req, res) => {
        console.log(req.params.id)
        db.Cohort.find({
            where: {
                id: req.params.id
            }
        }).then(dbCohort => {
            res.json(dbCohort)
        })
    }
}