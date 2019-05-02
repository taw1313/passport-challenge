import socketIOClient from 'socket.io-client'
require('dotenv').config()


console.log('DEBUG - GlobalData.js - env ', process.env)
console.log('DEBUG - GlobalData.js - env ', process.env.API_SECRET)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Global socket 
//    socket will be set in the App react compent when mounted
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const apiInterface = 'http://localhost:3001'
let socket = socketIOClient(apiInterface)

export { socket }