const router = require("express").Router();
const adminController = require("../../controller/adminController");

router.route('/users')
    .get(adminController.findAll)

module.exports = router