const router = require("express").Router();
const adminController = require("../../controller/adminController");

// router.route('/users')
//     .get(adminController.findAll)

router.route("/")
    .get(adminController.getAdmins)

router.route("/instructor")
    .get(adminController.getInstructors)

router.route("/student")
    .get(adminController.getStudents)

router.route("/:id")
    .delete(adminController.deleteAdmin)

router.route("/instructor/:id")
    .delete(adminController.deleteInstructor)

router.route("/student/:id")
    .delete(adminController.deleteStudent)

// router.route("/users/:id")
//     .delete(adminController.deleteUser)

module.exports = router