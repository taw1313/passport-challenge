module.exports = {
  factories: {
    TableName: 'Factories',
    KeySchema: [
      { AttributeName: 'factoryId', KeyType: 'HASH' },      //Partition key
      { AttributeName: 'factoryName', KeyType: 'RANGE' }    //Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: 'factoryId', AttributeType: 'S' },
      { AttributeName: 'factoryName', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  }

}
