const db = require("../models");
module.exports = {
    getInfo: (req, res) => {
        console.log(req.params.id)
        db.Cohort.findOne({
            where: {
                id: req.params.id
            }
        }).then(dbCohort => {
            console.log("\nGot Cohrort")
            res.json(dbCohort)
        })
    }
}