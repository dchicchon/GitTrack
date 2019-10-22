const router = require("express").Router();
const cohortController = require("../../controller/cohortController");


router.route("/")
    .get(cohortController.getInfo)


module.exports = router