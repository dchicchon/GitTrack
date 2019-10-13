const router = require("express").Router();
const instructorController = require("../../controller/instructorController");

// These are all the functions for instructors

router.route("/:id")
    .get(instructorController.getCohorts)

router.route("/students")
    .post(instructorController.createStudent)

router.route("/students/:id")
    .get(instructorController.getStudent)
    .delete(instructorController.removeStudent)


router.route('/cohorts')
    .post(instructorController.createCohort)

router.route("/cohorts/graph")
    .post(instructorController.getGraph)

router.route('/cohorts/:id')
    .get(instructorController.getStudents)

module.exports = router