const router = require("express").Router();
const adminRoutes = require("./admin")
const instructorRoutes = require("./instructor");
const studentRoutes = require("./student")

router.use('/admin', adminRoutes);
router.use("/instructor", instructorRoutes)
router.use("/student", studentRoutes)


module.exports = router