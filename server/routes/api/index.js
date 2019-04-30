const router = require('express').Router()
const factoryRoutes = require('./factoriesAPI')

router.use('/factoriesAPI', factoryRoutes)

module.exports = router
