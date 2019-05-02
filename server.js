require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)



const routes = require('./server/routes')
const {createTable} = require('./server/models/factories')
const {createSocketEvents} = require('./server/socket/socketEvents')
const PORT = process.env.PORT || 3001

//
// Define middleware Bere
//
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//
//  View and API routes
//
app.use(routes)

//
// create socket connection to client so server can send/emit updates
//
createSocketEvents( io )
app.set('socketio',io)

//
// start listener for clients
//
let server = http.listen(PORT, () => {
  console.log(`DEBUG - now listening on Port ${PORT}`)
})

//
// Create the AWS DynamoDB table
//
createTable()
  .then( (res) => {
    console.log('DEBUG - after promise ', res)
  })
  .catch( (err) => {
    console.log('ERROR - Unalble to create table. \n', JSON.stringify(err, null, 2))
  })