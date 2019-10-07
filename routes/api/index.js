const router = require("express").Router();
const adminRoutes = require("./admin")
const instructorRoutes = require("./instructor");
const studentRoutes = require("./student")
const settingRoutes = require("./settings");

router.use('/admin', adminRoutes);
router.use("/instructor", instructorRoutes)
router.use("/student", studentRoutes)
router.use("/settings", settingRoutes)


module.exports = router