const db = require('../models/factories')

module.exports = {

    createSocketEvents: (io) => {
        console.log('DEBUG - socket io', io)
        io.on('connection', socket => {
            console.log('DEBUG - socket connection', socket.id)
            //
            // return the intial data
            //
            socket.on('initial_data', () => {
                console.log('DEBUG - socket() initial_data event received')
                db.readAllFactories()
                  .then( (data) => {
                      io.sockets.emit('get_data', data)
                  })
            })
        })
    }
}