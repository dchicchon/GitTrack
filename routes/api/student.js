const router = require("express").Router();
const studentController = require("../../controller/studentController");

router.route("/ghUsername")
    .put(studentController.editGithubUsername)

module.exports = router