const router = require("express").Router();
// const axios = require("axios");
// const moment = require("moment");
const path = require("path");

router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/public/index.html"))
})

module.exports = router;
