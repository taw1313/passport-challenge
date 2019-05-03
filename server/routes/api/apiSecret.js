require('dotenv').config()
const jwt = require('jsonwebtoken')

const createSecret = () => {
    return process.env.REACT_APP_API_SECRET
}

module.exports = {
    apiSecret: () => {
        return createSecret()
    },
    verifyToken: (req, res, next) => {
        console.log('DEBUG - verifyToken', process.env.API_WITH_TOKEN)
        //
        // Allow testing without JWTs
        //
        if ( process.env.API_WITH_TOKEN ) {
            console.log('DEBUG - verifyToken before socketio get')
            //
            // ToDo: Need to move this logic to where the server sockets are being connected and disconnected
            //       and create a global "hash"
            //
            const io = req.app.get('socketio')
            const clientSockets = Object.keys(io.sockets.connected)
            let hashOfKnownClients = new Object()
            for (let i=0; i<clientSockets.length; i++ ) hashOfKnownClients[clientSockets[i]]=true
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            console.log( 'DEBUG - hashOfKnownClients ', hashOfKnownClients )

            // Get auth header value
            const bearerHeader = req.headers['authorization']
            // Check if bearer is undefinded
            if (typeof bearerHeader !== 'undefined') {
                const bearer = bearerHeader.split(' ')
                // Get token from array
                const bearerToken = bearer[1]
                jwt.verify(bearerToken, createSecret(), (err, decodedBearerToken) => {
                    console.log( 'DEBUG - decodedBearerToken ', decodedBearerToken )
                    console.log( 'DEBUG - decodedBearerToken is in known clients', hashOfKnownClients[decodedBearerToken.mySocket] )
                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                    //
                    // if successfully decoded jwt and payload contained known socket connection ID then continue
                    //
                    if (!err && hashOfKnownClients[decodedBearerToken.mySocket] ) {
                        req.token = bearerToken
                        next()
                    }
                    else {
                        res.sendStatus(403)
                    }
                })
            }
            else {
                // Forbidden
                res.sendStatus(403)
            }
        }
        else {
            console.log('DEBUG - verifyToken before next')
            next()
        }
    }
}