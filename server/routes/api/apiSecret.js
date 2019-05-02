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
        //
        // Allow testing without JWTs
        //
        if ( process.env.API_WITHOUT_TOKEN ) next()
        else {
            const io = req.app.get('socketio')
            const clientSockets = Object.keys(io.sockets.connected)
            console.log('DEBUG - delFactory io sockets connected id', clientSockets)

            // Get auth header value
            const bearerHeader = req.headers['authorization']
            // Check if bearer is undefinded
            if (typeof bearerHeader !== 'undefined') {
                const bearer = bearerHeader.split(' ')
                // Get token from array
                const bearerToken = bearer[1]
                jwt.verify(bearerToken, createSecret(), (err, decodedBearerToken) => {
                    if (err) {
                        // invalid token most likely wrong secret
                        res.sendStatus(403)
                    }
                    else {
                        req.token = bearerToken
                        next()
                    }
                })
            }
            else {
                // Forbidden
                res.sendStatus(403)
            }
        }
    }
}