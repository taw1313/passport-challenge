const AWS = require('aws-sdk')

AWS.config.update({
  region: 'us-east-2',
  endpoing: 'http://localhost:8000'
})

const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

const factoriesTable = {
  TableName: 'Factories',
  KeySchema: [
    { AttributeName: 'factoryId', KeyType: 'HASH' }      //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: 'factoryId', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Factory object schema validation definition
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const factorySchema = {
  factoryId: value => /^[\w -]+$/.test(value),
  factoryName: value => /^[\w ]+$/.test(value),
  nodeMinRange: value => parseInt(value) === Number(value) && value >= 1 && value <= 20000,
  nodeMaxRange: value => parseInt(value) === Number(value) && value >= 1 && value <= 20000,
  childern: value => value.length <= 15
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Child node object schema validation definition
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const nodeSchema = {
  nodeNum: value => parseInt(value) === Number(value) && value >= 1 && value <= 2147483647,
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Will walk the object to determine that each object key (property) is valid and that each object value is validated
// against it's associated schema definition
//
// Will return an array of errors
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const validate = (object, schema) => Object
    .entries(object)                            // create an array of the object being checked
    .map(([property]) => [                      // This allows us to fail if any property does not exist or has a type-o ( see below )
        property,
        schema[property]
    ])
    .map(([property, validate ]) => {
        if ( validate ) return ([ property, validate(object[property]) ])
        else return([ property, false ])         // Property not defined in schema
    })
    .reduce((errors, [property, valid]) => {
        if (!valid) errors.push(new Error(`${property} is invalid`))
        return errors
    }, [])

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Will walk the schema to determine that the object contains all the keys defined in the schema
//
// Will return an array of errors
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const contains = (object, schema) => Object
    .entries(schema)
    .map(([property]) => [
        property,
        (object[property] ? true : false)
    ])
    .reduce((errors, [property, exists]) => {
        if (!exists) errors.push(new Error(`${property} does not exist`))
        return errors
    }, [])

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// check each key and value pair in the factory object
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const validateFactoryObj = (factoryObj) => {
    let errors = validate(factoryObj, factorySchema)
    errors = errors.concat( contains(factoryObj, factorySchema))

    if ( factoryObj.childern ) {
      if ( factoryObj.childern.length > 0 ) {
        let childError = []
        factoryObj.childern.forEach( (child) => {
          childError = validate(child, nodeSchema)
          if ( childError.length > 0 ) errors.push(childError[0])
          childError = contains(child, nodeSchema)
          if ( childError.length > 0 ) errors.push(childError[0])
        })
      }
    }

    let messages = ''
    if (errors.length > 0) {
      messages = 'ERROR - '
      for (const { message } of errors) {
         messages += `${message}, `
      }
    } else {
      messages = ''
    }      
    messages = messages.replace(/,\s*$/, '')
    return messages
}

module.exports = {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  createTable: () => {
    return new Promise( (resolve, reject) => {
      dynamodb.createTable(factoriesTable, (err, data) => {
        //
        // Do not reject if the Table already exists
        //
        if ( err && (err.code != 'ResourceInUseException')) {
          reject(err)
        }
        else {
          resolve('AWS DynomoDB table is ready')
        }
      })
    })
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // factoryObj = {
  //   'factoryId': '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',      // generated by uuid 
  //   'factoryName': 'abc123',
  //   'nodeMinRange': 1,
  //   'nodeMaxRange': 10,000,
  //   'childern': [
  //     {'nodeNum': 357},
  //     {'nodeNum': 23}
  //   ]
  // }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  createFactory: (factoryObj) => {
    return new Promise( (resolve, reject) => {
      let errMessage = validateFactoryObj( factoryObj )
      if ( errMessage.length > 0 ) reject(errMessage)
      else {
        let params = {
          TableName: factoriesTable.TableName,
          Item: factoryObj
        }
        docClient.put(params, (err, data) => {
          (err) ? reject(err) : resolve(factoryObj)
        })
      }
    })
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // queryObj = {
  //   'factoryId': '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',      // generated by uuid 
  // }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  readAllFactories: () => {
    return new Promise( (resolve, reject) => {
      let params = {
        TableName: factoriesTable.TableName
      }
      docClient.scan(params, (err, data) => {
        (err) ? reject(err) : resolve(data)
      })
    })
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // queryObj = {
  //   'factoryId': '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',      // generated by uuid 
  // }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  readFactory: (queryObj) => {
    return new Promise( (resolve, reject) => {
      let errMessage = validateFactoryObj( queryObj )
      if ( errMessage.includes('factoryId') ) reject('ERROR - queryObj is not valid')
      else {
        let params = {
          TableName: factoriesTable.TableName,
          Key: queryObj
        }
        docClient.get(params, (err, data) => {
          (err) ? reject(err) : resolve(data)
        })
      }
    })
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // queryObj = {
  //   'factoryId': '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',      // generated by uuid 
  // }
  //
  // --- Update a Factory Name ---
  //   updateObj = {
  //     UpdateExpression: 'set factoryName = :n'
  //     ExpressionAttributeValues: {
  //       ':n':'New Factory Name'
  //      }
  //    }
  //
  // --- Update a Factory to have no Childern ---
  //   updateObj = {
  //     UpdateExpression: 'set childern = :a'
  //     ExpressionAttributeValues: {
  //       ':a':[]
  //     }
  //   }
  //
  // --- Update a Factories' Childern ---
  //   updateObj = {
  //     UpdateExpression: 'set childern = :a'
  //     ExpressionAttributeValues: {
  //       ':a':[
  //         {'nodeNum': 1357},
  //         {'nodeNum': 3865},
  //         {'nodeNum': 883}
  //       ]
  //     }
  //   }
  //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateFactory: (queryObj, updateObj) => {
    return new Promise( (resolve, reject) => {
      let errMessage = validateFactoryObj( queryObj )
      if ( errMessage.includes('factoryId') ) reject('ERROR - queryObj is not valid')
      else {
        errMessage = validateFactoryObj( updateObj )
        if ( errMessage.length > 0 ) reject(errMessage)
        else {
          let params = {
            TableName: factoriesTable.TableName,
            Key: queryObj,
            UpdateExpression: 'set factoryName = :f, nodeMinRange = :n, nodeMaxRange = :x, childern = :a',
            ExpressionAttributeValues: {
              ':f': updateObj.factoryName,
              ':n': updateObj.nodeMinRange,
              ':x': updateObj.nodeMaxRange,
              ':a': updateObj.childern
            },
            ReturnValues: "UPDATED_NEW"
          }

          docClient.update(params, (err, data) => {
            (err) ? reject(err) : resolve(updateObj)
          })
        }
      }
    })
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // queryObj = {
  //   'factoryId': '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',      // generated by uuid 
  // }
  //
  // --- Delete a Factory Name ---
  // delObj = { null }
  //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deleteFactory: (queryObj, delObj) => {
    return new Promise( (resolve, reject) => {
      if ( Object.keys(delObj).length != 0 ) reject('ERROR - delObj is not empty')
      else {
        let errMessage = validateFactoryObj( queryObj )
        if ( errMessage.includes('factoryId') ) reject('ERROR - queryObj is not valid')
        else {
          let params = {
            TableName: factoriesTable.TableName,
            Key: queryObj,
            delObj
          }

          docClient.delete(params, (err, data) => {
            (err) ? reject(err) : resolve(queryObj)
          })
        }
      }
    })
  }

}