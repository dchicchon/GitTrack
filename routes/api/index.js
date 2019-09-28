const router = require("express").Router();
const adminRoutes = require("./admin")

router.use('/admin', adminRoutes);
// router.use("/instructor", instructRoutes)
// router.use("/student", studentRoutes)


module.exports = router