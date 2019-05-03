require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const https = require('https')
const fs = require('fs')

const routes = require('./server/routes')
const {createTable} = require('./server/models/factories')
const {createSocketEvents} = require('./server/socket/socketEvents')
const PORT = process.env.PORT || 3001

//
// Certificate
//
const certDir = `${process.env.SSL_CERT_DIR}${process.env.DOMAIN_NAME}`
const credentials = {
    key: fs.readFileSync(`${certDir}/privkey.pem`, 'utf8'),
    cert: fs.readFileSync(`${certDir}/cert.pem`, 'utf8'),
    ca: fs.readFileSync(`${certDir}/chain.pem`, 'utf8')
}

//
// necessary to get https resolve CORS 
//
app.use(cors())

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
// start listener for clients
//
//let server = http.listen(PORT, () => {
let server = https.createServer(credentials, app).listen(PORT, () => {
  console.log(`DEBUG - now listening on Port ${PORT}`)
})

//
// create socket connection for client so server can send/emit updates
//
const io = require('socket.io').listen(server)
createSocketEvents( io )
app.set('socketio',io)

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