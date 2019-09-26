// This file handles the routing for authentication requests

const express = require("express");
const router = express.Router();
const authController = require("../../controller/authController");

router.route("/login")
    .post(authController.login)

router.route("/logout")
    .get(authController.logout)
module.exports = router;