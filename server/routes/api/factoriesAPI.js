const router = require('express').Router()
const factoryController = require('../../controllers/factoryController')
const {verifyToken} = require('./apiSecret')

router.route( '/' )
    .post( verifyToken, factoryController.createFactory )
    .get( verifyToken, factoryController.getAllFactories )

router.route( '/:factoryId' )
    .post( verifyToken, factoryController.updateFactory )
    .get( verifyToken, factoryController.getFactory )
    .delete( verifyToken, factoryController.delFactory )

module.exports = router