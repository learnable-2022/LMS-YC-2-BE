const { Router } = require('express')
const userRoutes = require('./user.routes')
const adminRoutes = require('./admin.routes')
const router = Router()

router.use('/v1', adminRoutes)
router.use('/v1', userRoutes)


module.exports = router