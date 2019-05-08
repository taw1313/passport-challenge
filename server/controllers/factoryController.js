const db = require('../models/factories')

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createFactory: (req, res) => {
        const io = req.app.get('socketio')
        db.createFactory( req.body ) 
            .then( (factory) => {
                res.json('Success') 
                io.sockets.emit('new_factory', factory)
            })
            .catch( (err) => res.status(422).json(err) )
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    //  Read will not emit updates to clients via socket connections
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getAllFactories: (req, res) => {
        db.readAllFactories()
            .then( (data) => res.json(data) )
            .catch( (err) => res.status(422).json(err) )

    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    //  Read will not emit updates to clients via socket connections
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
    updateFactory: (req, res) => {
        const io = req.app.get('socketio')
        db.updateFactory( req.params, req.body )
            .then( (data) => {
                res.json('Success') 
                io.sockets.emit('factory_updated', data)
            })
           .catch( (err) => res.status(422).json(err) )
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    delFactory: (req, res) => {
        const io = req.app.get('socketio')
        db.deleteFactory( req.params, req.body )
            .then( (data) => {
               res.json('Success') 
               //
               // Due to a race condition do not send update to all clients
               //   Let the client that initiated the del recieve the API response
               //   Then let it emit a message that will result in all clients getting
               //   the update
               //
            })
           .catch( (err) => res.status(422).json(err) )
    }
}