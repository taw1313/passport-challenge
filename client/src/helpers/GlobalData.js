import socketIOClient from 'socket.io-client'
require('dotenv').config()


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Global socket 
//    socket will be set in the App react compent when mounted
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const apiInterface = process.env.REACT_APP_API_URL
let socket = socketIOClient(apiInterface)

export { socket }