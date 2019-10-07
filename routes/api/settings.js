let router = require("express").Router();
let settingsController = require("../../controller/settingController")


router.route("/")
    .put(settingsController.editAccount)

module.exports = router