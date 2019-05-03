import axios from 'axios'
import https from 'https'
import { socket } from './GlobalData'
import jwt from 'jsonwebtoken'
require('dotenv').config()

process.env.NODE_TLS_REJECT_UNAUTHORIZED="0"
const URL=process.env.REACT_APP_API_URL

const axiosOverride = axios.create({
    baseURL: URL,
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false,
        globalAgent: {
            options: {
                rejectUnauthorized: false
            }
        }
    })
})

const htmlHeadersWithToken = () => {
    console.log('DEBUG - htmlHeadersWithToken ', socket.connected)
    console.log('DEBUG - htmlHeadersWithToken ', socket.id)
    let headers = {}
    if ( socket.connected ) {
        let jwtSignedToken = jwt.sign(
            {mySocket: socket.id},
            process.env.REACT_APP_API_SECRET
        )
        headers = {headers:  {'Authorization': `Bearer ${jwtSignedToken}`}}
    }
    return headers
}

export default {
    createFactory: (factory) => {
        return axiosOverride.post('/api/factoriesAPI', factory, htmlHeadersWithToken())
    },
    getAllFactories: () => {
        return axiosOverride.get('/api/factoriesAPI', htmlHeadersWithToken())
    },
    getFactory: (factoryId) => {
        return axiosOverride.get(`/api/factoriesAPI/${factoryId}`, htmlHeadersWithToken())
    },
    updateFactory: (factory) => {
        return axiosOverride.post(`/api/factoriesAPI/${factory.factoryId}`, factory, htmlHeadersWithToken())
    },
    delFactory: (factoryId) => {
        return axiosOverride.delete(`/api/factoriesAPI/${factoryId}`, htmlHeadersWithToken())
    }
}