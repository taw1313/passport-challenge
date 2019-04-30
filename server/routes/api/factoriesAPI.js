const router = require('express').Router()
const factoryController = require('../../controllers/factoryController')

router.route( '/' )
    .post( factoryController.createFactory )
    .get( factoryController.getAllFactories )

router.route( '/:factoryId' )
    .post( factoryController.updateFactory )
    .get( factoryController.getFactory )
    .delete( factoryController.delFactory )

module.exports = router