const router = require("express").Router();
const adminRoutes = require("./admin")
const instructorRoutes = require("./instructor");

router.use('/admin', adminRoutes);
router.use("/instructor", instructorRoutes)
// router.use("/student", studentRoutes)


module.exports = router