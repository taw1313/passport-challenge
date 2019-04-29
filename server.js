require('dotenv').config()
const AWS = require('aws-sdk')
const express = require('express')
const bodyParser = require('body-parser')


const routes = require('./server/routes')
const Factories = require('./server/models/factories')
const app = express()
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


AWS.config.update({
  region: 'us-east-2',
  endpoing: 'http://localhost:8000'
})

let dynamodb = new AWS.DynamoDB()

let params = Factories.factories
dynamodb.createTable(params, (err, data) => {
  if ( err && (err.code != 'ResourceInUseException')) 
	console.log('ERROR - Unalble to create table. \n', JSON.stringify(err, null, 2))
  else {
    console.log('DEBUG - AWS DynomoDB table is ready ')
    //
    // start listener for clients
    //
    app.listen(PORT, () => {
      console.log(`DEBUG - now listening on Port ${PORT}`)
    })
  }
})
