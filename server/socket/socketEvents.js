const db = require('../models/factories')

let arrayOfLockedFactories = []

module.exports = {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    createSocketEvents: (io) => {
        io.on('connection', socket => {
            socket.on('client_res_delFactory', (factoryId) => {
               io.sockets.emit('factory_deleted', factoryId)
            }),
            socket.on('lock_factory', (factoryId) => {
                io.sockets.emit('factory_locked', factoryId)
                arrayOfLockedFactories.push(factoryId)
            }),
            socket.on('unlock_factory', (factoryId) => {
                io.sockets.emit('factory_unlocked', factoryId)
                arrayOfLockedFactories = arrayOfLockedFactories.filter( (a) => a != factoryId )
            }),
            //
            // upon a new client connection resend all factories that are in a locked
            //
            socket.on('loadedFactories', () => {
                arrayOfLockedFactories.forEach( (a) => {
                    io.sockets.emit('factory_locked', a) 
                })
            })
        })
    }

}