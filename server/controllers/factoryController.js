const db = require('../models/factories')

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createFactory: (req, res) => {
         db.createFactory( req.body ) 
           .then( (data) => res.json(data) )
           .catch( (err) => res.status(422).json(err) )
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getAllFactories: (req, res) => {
        db.readAllFactories()
           .then( (data) => res.json(data) )
           .catch( (err) => res.status(422).json(err) )

    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    updateFactory: (req, res) => {
        db.updateFactory( req.params, req.body )
           .then( (data) => res.json(data) )
           .catch( (err) => res.status(422).json(err) )

    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getFactory: (req, res) => {
        db.readFactory( req.params )
           .then( (data) => res.json(data) )
           .catch( (err) => res.status(422).json(err) )

    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    delFactory: (req, res) => {
        db.deleteFactory( req.params, req.body )
           .then( (data) => res.json(data) )
           .catch( (err) => res.status(422).json(err) )
    }
}