const router = require("express").Router();
const studentController = require("../../controller/studentController");

router.route("/ghUsername")
    .put(studentController.editGithubUsername)

router.route("/:username")
    .get(studentController.getData)
    
module.exports = router