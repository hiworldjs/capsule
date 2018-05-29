const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'});
// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

var createTable = tableName => {
    var params = {
        TableName: tableName,
        AttributeDefinitions: [{
            AttributeName: 'code',
            AttributeType: 'S'
        }],
        KeySchema: [{
            AttributeName: 'code',
            KeyType: 'HASH'
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    }

    // Call DynamoDB to create the table
    ddb.createTable(params, function(err, data) {
      if (err) {
          console.log("Error: " + err);
          return "Error";
      }

      console.log("Success: " + data);
      return "Success";
    });
}

module.exports = createTable;
