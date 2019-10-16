const router = require("express").Router();
const adminRoutes = require("./admin")
const instructorRoutes = require("./instructor");
const studentRoutes = require("./student")
const settingRoutes = require("./settings");
// const mailRoutes = require("./mail")

router.use('/admin', adminRoutes);
router.use("/instructor", instructorRoutes)
router.use("/student", studentRoutes)
router.use("/settings", settingRoutes)
// router.use("/mail", mailRoutes)


module.exports = router