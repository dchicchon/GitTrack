const router = require("express").Router();
const studentController = require("../../controller/studentController");

router.route("/ghUsername")
    .put(studentController.editGithubUsername)

// Switch with id
router.route("/:id")
    .get(studentController.getData)

module.exports = router