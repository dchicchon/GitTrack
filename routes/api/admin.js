const router = require("express").Router();
const adminController = require("../../controller/adminController");

router.route('/users')
    .get(adminController.findAll)

router.route("/users/:id")
    .delete(adminController.deleteUser)

module.exports = router