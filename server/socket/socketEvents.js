const db = require('../models/factories')

module.exports = {

    createSocketEvents: (io) => {
        io.on('connection', socket => {
            console.log('DEBUG - socket connection', socket.id)

            socket.on('lock_factory', (factoryId) => {
                io.sockets.emit('factory_locked', factoryId)
            }),
            socket.on('unlock_factory', (factoryId) => {
                io.sockets.emit('factory_unlocked', factoryId)
            })

        })
    }
}