const router = require("express").Router();
const instructorController = require("../../controller/instructorController");

router.route("/:id")
    .get(instructorController.getCohorts)

router.route('/cohorts')
    .post(instructorController.createCohort)

router.route('/cohorts/:id')
    .get(instructorController.getStudents)


module.exports = router