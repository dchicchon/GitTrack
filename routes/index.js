const router = require("express").Router();
// const axios = require("axios");
// const moment = require("moment");
const path = require("path");

// Routes for API and Authentication
const authRoutes = require("./auth");
const apiRoutes = require("./api");

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

router.route("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})



module.exports = router;
